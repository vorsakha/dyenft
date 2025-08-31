import { network } from "hardhat";

const { viem } = await network.connect({
  network: "localhost",
});

const publicClient = await viem.getPublicClient();

const address =
  process.env.CONTRACT_ADDRESS || "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9";
const tokenId = process.env.TOKEN_ID ? BigInt(process.env.TOKEN_ID) : 1n;

console.log("Checking tokenURI for", address, "tokenId", tokenId.toString());

try {
  const contract = await viem.getContractAt("DyeNFT", address as `0x${string}`);
  const uri = await contract.read.tokenURI([tokenId]);
  console.log("tokenURI:", uri.slice(0, 200) + (uri.length > 200 ? "..." : ""));
} catch (err: unknown) {
  console.error("call failed:", (err as Error).message);
  process.exitCode = 1;
}
