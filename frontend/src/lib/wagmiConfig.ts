import { createConfig, http } from "wagmi";
import { hardhat } from "viem/chains";
import { injected } from "@wagmi/connectors";
import { rpcUrl } from "@/utils/env";

export const config = createConfig({
  chains: [hardhat],
  connectors: [injected({ target: "metaMask" })],
  transports: {
    [hardhat.id]: http(rpcUrl),
  },
});
