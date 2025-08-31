import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DyeNFTModule = buildModule("DyeNFTModule", (m) => {
  const dsvg = m.contract("DyeNFT");
  return { dsvg };
});

export default DyeNFTModule;
