import { provider } from "@/lib/provider";
import { useEffect } from "react";
import { toast } from "sonner";
import { useConnect } from "wagmi";

export const useMetaMaskConnect = () => {
  const { connect, connectors, error: connectError } = useConnect();

  const checkMetaMask = () => {
    if (!provider) {
      toast.error("MetaMask not found. Please install MetaMask.");

      return;
    }
  };

  function handleConnect() {
    checkMetaMask();

    if (connectors && connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  }

  useEffect(() => {
    if (connectError) {
      toast.error(connectError.message);
    }
  }, [connectError]);

  return { handleConnect, connectError };
};
