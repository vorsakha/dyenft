# 🖌️ Dye NFT Smart Contracts

This directory contains the smart contracts for the **Dye NFT** project - a ERC721 implementation that generates fully on-chain, animated SVG NFTs that dynamically change based on real-time blockchain data.

## 📋 Contract Overview

### DyeNFT.sol

The main contract implements ERC721 standard with dynamic, on-chain SVG generation:

- **🎨 Dynamic Visuals**: Colors, shapes, and animations change based on owner balance and block data
- **⚡ Gas Optimized**: Pure functions for efficient on-chain SVG generation
- **🔒 Secure**: Built on OpenZeppelin standards with comprehensive testing
- **📊 Live Metadata**: `tokenURI()` generates fresh metadata with each call

### Key Features

- **On-Chain SVG Generation**: 100% on-chain, no external dependencies
- **Dynamic Properties**: Visual elements respond to:
  - Owner's ETH balance
  - Current block number
  - Token ID
  - Owner address
- **Animated Elements**: Rotating orbital rings, starfields, and glow effects
- **Real-time Evolution**: NFTs change appearance as blockchain state updates

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
# Install dependencies
npm install

# Start local Hardhat network
npm run dev

# Deploy contract and mint first NFT
npm run local
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local Hardhat network |
| `npm test` | Run all tests (Solidity + TypeScript) |
| `npm run deploy` | Deploy to local network |
| `npm run deploy:local` | Deploy to localhost network |
| `npm run mint` | Mint new NFT on local network |
| `npm run mint:local` | Mint new NFT on localhost |
| `npm run local` | Deploy + mint in one command |


### Test Coverage

Tests verify:
- ✅ Contract deployment and initialization
- ✅ NFT minting functionality
- ✅ Dynamic tokenURI generation
- ✅ SVG output validation
- ✅ Metadata parsing and structure
- ✅ Dynamic property calculations

## 🚢 Deployment

### Local Development
```bash
# Terminal 1: Start network
npm run dev

# Terminal 2: Deploy and mint
npm run local
```

### Mainnet
```bash
# Set mainnet private key
npx hardhat keystore set MAINNET_PRIVATE_KEY

# Deploy to mainnet
npx hardhat ignition deploy --network mainnet ignition/modules/DyeNFT.ts
```

## 🏗️ Contract Architecture

### Core Functions

#### `mint()`
```solidity
function mint() external returns (uint256 tokenId)
```
Mints a new Dye NFT to the caller and returns the token ID.

#### `tokenURI(uint256 tokenId)`
```solidity
function tokenURI(uint256 tokenId) public view returns (string memory)
```
Generates complete metadata URI with embedded SVG image.

### Dynamic Properties

Each NFT's appearance is determined by:

| Property | Data Source | Effect |
|----------|-------------|---------|
| **Base Color** | Owner address + balance + block | HSL hue value |
| **Shape** | Block number parity | Circle vs Rectangle |
| **Animation Speed** | Owner ETH balance | Orbital rotation speed |
| **Starfield** | Token ID + owner + block | Background constellation |
| **Ring Colors** | Dynamic HSL calculations | Orbital element colors |

## 📁 Project Structure

```
contracts/
├── contracts/
│   └── DyeNFT.sol           # Main ERC721 contract
├── ignition/
│   └── modules/
│       └── DyeNFT.ts        # Deployment module
├── scripts/
│   ├── mint.ts             # Minting script
│   ├── checkTokenURI.ts    # TokenURI inspection
│   └── send-op-tx.ts       # Optimism transaction helper
├── test/
│   └── DyeNFT.ts           # Contract tests
├── hardhat.config.ts       # Hardhat configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## 🔧 Configuration

### Hardhat Config
- **Solidity**: ^0.8.28 (with optimizer enabled)
- **Networks**: Localhost, Sepolia, Mainnet
- **Testing**: Native Node.js test runner + Foundry-compatible tests
- **Deployment**: Hardhat Ignition for reliable deployments

### Dependencies
- **@openzeppelin/contracts**: 5.4.0 - ERC721 implementation
- **hardhat**: ^3.0.3 - Development framework
- **viem**: ^2.36.0 - TypeScript Ethereum library

## 🔒 Security

### Audit Considerations
- Built on audited OpenZeppelin contracts
- Reentrancy protection via ERC721 standard
- Input validation on all public functions
- Overflow protection (Solidity 0.8+)
- Access control through ownership

### Best Practices
- Comprehensive test coverage
- Foundry-compatible test suite
- TypeScript integration tests
- Gas optimization verified

## 🤝 Development

### Contributing
1. Follow Solidity style guide
2. Add tests for new functionality
3. Update gas analysis for changes
4. Test on multiple networks

### Code Quality
- ESLint for TypeScript
- Prettier for code formatting
- Foundry for additional testing
- Comprehensive documentation

---

For the complete project overview, see the [root README](../README.md).
