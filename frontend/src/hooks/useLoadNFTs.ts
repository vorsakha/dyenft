import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { useCallback, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { contractAbi } from "@/lib/abi";
import { contractAddress } from "@/utils/env";

type NFT = {
  tokenId: bigint;
  image: string;
};

type Metadata = {
  status: string;
  result?: string;
};

const useLoadNFTs = () => {
  const { address, isConnected } = useAccount();

  const {
    data: balance,
    isLoading: loadingBalance,
    refetch: refetchBalance,
    error: balanceError,
    queryKey: balanceQueryKey,
  } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    },
  });

  const tokenIndexes = useMemo(() => {
    if (!balance) return [];
    return Array.from({ length: Number(balance) }, (_, i) => i);
  }, [balance]);

  const {
    data: tokenIdResults,
    isLoading: loadingTokenIds,
    refetch: refetchTokenIds,
    error: tokenIdsError,
    queryKey: tokenIdsQueryKey,
  } = useReadContracts({
    contracts: tokenIndexes.map((index) => ({
      address: contractAddress,
      abi: contractAbi,
      functionName: "tokenOfOwnerByIndex",
      args: [address!, BigInt(index)],
    })),
    query: {
      enabled: !!address && isConnected && tokenIndexes.length > 0,
    },
  });

  const tokenIds = useMemo(() => {
    if (!tokenIdResults) return [];
    return tokenIdResults
      .filter(
        (result): result is typeof result & { result: bigint } =>
          result.status === "success" && result.result !== undefined,
      )
      .map((result) => result.result);
  }, [tokenIdResults]);

  const {
    data: metadataResults,
    isLoading: loadingMetadata,
    refetch: refetchMetadata,
    error: metadataError,
    queryKey: metadataQueryKey,
  } = useReadContracts({
    contracts: tokenIds.map((tokenId) => ({
      address: contractAddress,
      abi: contractAbi,
      functionName: "tokenURI",
      args: [tokenId],
    })),
    query: {
      enabled: tokenIds.length > 0,
    },
  });

  const gallery = useMemo(() => {
    if (!metadataResults || !tokenIds) return [];

    return (metadataResults as Array<Metadata>)
      .map((result, index) => {
        if (result.status !== "success" || !result.result) return null;

        const uri = result.result;
        if (!uri.startsWith("data:application/json;base64,")) return null;

        try {
          const b64 = uri.replace("data:application/json;base64,", "");
          const json = JSON.parse(atob(b64)) as { image?: string };
          return json.image
            ? {
                tokenId: tokenIds[index],
                image: json.image,
              }
            : null;
        } catch {
          return null;
        }
      })
      .filter(Boolean) as Array<NFT>;
  }, [metadataResults, tokenIds]);

  const loading = loadingBalance || loadingTokenIds || loadingMetadata;

  const refetch = useCallback(() => {
    refetchBalance();
    refetchTokenIds();
    refetchMetadata();
  }, [refetchBalance, refetchMetadata, refetchTokenIds]);

  useEffect(() => {
    const errors = [balanceError, tokenIdsError, metadataError];

    if (errors.some((error) => error)) {
      toast.error(errors.map((error) => error?.message).join("\n"));
    }
  }, [balanceError, tokenIdsError, metadataError]);

  return {
    gallery: gallery as Array<NFT>,
    loading,
    refetch,
    balance: balance ? Number(balance) : 0,
    queryKeys: [balanceQueryKey, tokenIdsQueryKey, metadataQueryKey],
  };
};

export { useLoadNFTs };
