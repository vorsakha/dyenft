import { network } from "hardhat";
import fs from "fs";
import path from "path";

const { viem } = await network.connect();

console.log("Minting Dye NFT...");

// Get the deployed contract address from ignition deployment
const deploymentPath = path.join(
  process.cwd(),
  "ignition",
  "deployments",
  "chain-31337",
  "deployed_addresses.json",
);
const deployments = JSON.parse(fs.readFileSync(deploymentPath, "utf-8"));
const contractAddress = deployments["DyeNFTModule#DyeNFT"] as `0x${string}`;

console.log("Contract address:", contractAddress);

// Get the contract instance
const nft = await viem.getContractAt("DyeNFT", contractAddress);
const publicClient = await viem.getPublicClient();
const [walletClient] = await viem.getWalletClients();

console.log("Minter address:", walletClient.account.address);

// Simulate the mint call to get the return value (tokenId)
console.log("Simulating mint to get token ID...");
const simulatedResult = await nft.simulate.mint();
const tokenId = simulatedResult.result;

// Mint the token
console.log("Minting token...");
const mintTx = await nft.write.mint();

// Wait for confirmation
await publicClient.waitForTransactionReceipt({ hash: mintTx });

console.log("Token minted successfully!");
console.log(`Minted token ID: ${tokenId}`);

// Get and display the token URI
const tokenUri = await nft.read.tokenURI([tokenId]);
console.log(`Token URI: ${tokenUri}`);
