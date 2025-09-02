import { hardhat } from "viem/chains";
import { createPublicClient, http } from "viem";
import { rpcUrl } from "@/utils/env";

export const client = createPublicClient({
  chain: hardhat,
  transport: http(rpcUrl),
});
