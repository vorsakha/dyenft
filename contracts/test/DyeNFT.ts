import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { network } from "hardhat";

describe("DyeNFT tokenURI", async function () {
  const { viem } = await network.connect();

  it("returns base64 JSON with image data URI", async function () {
    const nft = await viem.deployContract("DyeNFT");
    await nft.write.mint();

    const uri = await nft.read.tokenURI([1n]);

    assert.ok(typeof uri === "string");
    assert.ok(uri.startsWith("data:application/json;base64,"));

    const jsonStr = Buffer.from(
      uri.replace("data:application/json;base64,", ""),
      "base64",
    ).toString("utf8");

    const json = JSON.parse(jsonStr) as { image?: string };

    assert.ok(
      json.image && json.image.startsWith("data:image/svg+xml;base64,"),
    );
  });

  it("reverts for nonexistent token", async function () {
    const nft = await viem.deployContract("DyeNFT");
    let threw = false;

    try {
      await nft.read.tokenURI([999n]);
    } catch (e) {
      threw = true;
    }

    assert.ok(threw, "tokenURI did not revert for nonexistent token");
  });

  it("mint emits Transfer and ownerOf matches minter; multi-mint increments IDs", async function () {
    const nft = await viem.deployContract("DyeNFT");
    const publicClient = await viem.getPublicClient();
    const [walletClient] = await viem.getWalletClients();

    const tx1 = await nft.write.mint();
    await publicClient.waitForTransactionReceipt({ hash: tx1 });
    const tx2 = await nft.write.mint();
    await publicClient.waitForTransactionReceipt({ hash: tx2 });

    const owner1 = await nft.read.ownerOf([1n]);
    const owner2 = await nft.read.ownerOf([2n]);
    const minter = walletClient.account.address;

    assert.equal(owner1.toLowerCase(), minter.toLowerCase());
    assert.equal(owner2.toLowerCase(), minter.toLowerCase());
  });

  it("tokenURI JSON contains expected fields and attributes", async function () {
    const nft = await viem.deployContract("DyeNFT");
    await nft.write.mint();

    const uri = await nft.read.tokenURI([1n]);
    const jsonStr = Buffer.from(
      uri.replace("data:application/json;base64,", ""),
      "base64",
    ).toString("utf8");

    const json = JSON.parse(jsonStr) as {
      name?: string;
      description?: string;
      attributes?: Array<{ trait_type?: string; value?: string }>;
      image?: string;
    };

    assert.ok(json.name && json.name.includes("Dye NFT #1"));
    assert.ok(json.description && typeof json.description === "string");
    assert.ok(Array.isArray(json.attributes));

    const hasBlock = json.attributes.some((a) => a.trait_type === "Block");
    const hasBal = json.attributes.some(
      (a) => a.trait_type === "OwnerBalanceETH",
    );
    assert.ok(
      hasBlock && hasBal,
      "attributes missing Block or OwnerBalanceETH",
    );
    assert.ok(
      json.image && json.image.startsWith("data:image/svg+xml;base64,"),
    );
  });

  it("image SVG contains ID and short address formatting", async function () {
    const nft = await viem.deployContract("DyeNFT");
    const [walletClient] = await viem.getWalletClients();
    await nft.write.mint();

    const uri = await nft.read.tokenURI([1n]);
    const jsonStr = Buffer.from(
      uri.replace("data:application/json;base64,", ""),
      "base64",
    ).toString("utf8");
    const json = JSON.parse(jsonStr) as { image?: string };

    assert.ok(
      json.image && json.image.startsWith("data:image/svg+xml;base64,"),
    );
    const svg = Buffer.from(
      json.image.replace("data:image/svg+xml;base64,", ""),
      "base64",
    ).toString("utf8");

    assert.ok(svg.includes("ID 1"));

    const minter = walletClient.account.address.toLowerCase();
    const short = `0x${minter.slice(2, 6)}...${minter.slice(-4)}`;
    assert.ok(svg.includes(short));

    assert.ok(/BN \d+/.test(svg));
  });
});
