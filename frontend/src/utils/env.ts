export const contractAddress = import.meta.env
  .VITE_CONTRACT_ADDRESS as `0x${string}`;
export const rpcUrl =
  (import.meta.env.VITE_RPC_URL as string) || "http://127.0.0.1:8545";
