import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { toast } from "sonner";
import { useEffect } from "react";
import { mintAbi } from "@/lib/abi";
import { contractAddress } from "@/utils/env";

const useMint = (onSuccess?: () => void) => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      query: {
        enabled: !!hash,
      },
    });

  const mint = () => {
    writeContract({
      address: contractAddress,
      abi: mintAbi,
      functionName: "mint",
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      toast.success("NFT minted successfully!");
      onSuccess?.();
    }
  }, [isConfirmed, onSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return {
    mint,
    loading: isPending || isConfirming,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
  };
};

export default useMint;
