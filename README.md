# 🖌️ Dye NFT - Dynamic On-Chain SVG NFTs

**Dye NFT** is a revolutionary ERC721 smart contract that generates fully animated, on-chain SVG NFTs that dynamically change based on real-time blockchain data. Each NFT evolves and transforms based on its owner's ETH balance, current block number, and other on-chain variables.

![Dye NFT Demo](https://via.placeholder.com/350x350/1a1a2e/ffffff?text=Dye+NFT+Preview)

## ✨ What Makes Dye NFTs Special

Unlike static NFTs, **Dye NFTs** are living, breathing digital art that continuously evolves:

- **🎨 Dynamic Colors**: Colors change based on owner address and ETH balance
- **🌌 Animated Elements**: Rotating orbital rings with orbiting satellites
- **⭐ Starfield Background**: Procedurally generated star constellations
- **⚡ Real-time Updates**: Visual properties update with each block
- **💎 Balance-Driven**: Animation speeds and visual elements respond to owner's ETH holdings
- **🔄 Shape Morphing**: Alternates between circles and rounded rectangles based on block parity
- **📊 Live Metadata**: TokenURI updates in real-time with current blockchain state

## 🚀 Quick Start

### 1. Deploy & Mint Your First NFT

```bash
# Install dependencies
npm install

# Start local Hardhat network
cd contracts && npm run dev

# Deploy contract and mint NFT (in new terminal)
cd contracts && npm run local
```

### 2. View Your Dynamic NFT Collection

```bash
# Start the modern React frontend
cd frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to:
- **Connect your wallet** and view your NFT collection
- **Mint new NFTs** with real-time gallery updates
- **Experience dynamic animations** that evolve with blockchain data
- **Enjoy a beautiful responsive design** with dark/light themes

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nft
   ```

2. **Install contract dependencies**
   ```bash
   cd contracts
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## 🎯 Usage

### Minting NFTs

#### Local Development
```bash
cd contracts
npm run local  # Deploys contract + mints first NFT
```


### Viewing NFTs

#### Web Interface
1. Start the frontend: `cd frontend && npm run dev`
2. Connect your Web3 wallet (MetaMask, etc.)
3. View your personal NFT collection in a beautiful gallery
4. Mint new NFTs with automatic gallery refresh
5. Watch your NFTs evolve in real-time with blockchain data!

#### Direct Contract Interaction
```typescript
// Get tokenURI for any NFT
const tokenUri = await contract.tokenURI(tokenId);
```

### Available Scripts

#### Contracts
- `npm run dev` - Start local Hardhat network
- `npm run test` - Run all tests
- `npm run deploy` - Deploy to local network
- `npm run mint` - Mint new NFT
- `npm run local` - Deploy + mint in one command

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🏗️ Architecture

### Smart Contract (`DyeNFT.sol`)

**Core Features:**
- **ERC721 Compliant**: Standard NFT interface
- **On-Chain SVG Generation**: 100% on-chain, no external dependencies
- **Dynamic Metadata**: `tokenURI()` generates fresh metadata each call
- **Gas Efficient**: Optimized for mainnet deployment

**Visual Elements:**
- Animated gradient backgrounds
- Procedural starfield generation
- Orbiting ring systems with satellites
- Dynamic color schemes using HSL
- Grid overlay patterns
- Glow and shadow effects

### Frontend (React + TypeScript + Vite)

**Modern Tech Stack:**
- **React (v18+)** with TypeScript for type-safe development
- **Vite** for lightning-fast development and building
- **Tailwind CSS (v3+)** for utility-first styling
- **shadcn/ui** components for a consistent design system
- **Wagmi** for Web3 wallet integration
- **Viem** for TypeScript-first Ethereum interactions

**Features:**
- **🎨 Dynamic NFT Gallery**: Beautiful grid layout showcasing your collection
- **⚡ Real-time Minting**: Mint NFTs with automatic gallery refresh
- **🌙 Dark/Light Theme**: Automatic theme switching with system preference
- **📱 Fully Responsive**: Optimized for all screen sizes and devices
- **🔗 Wallet Integration**: Connect MetaMask and other Web3 wallets
- **✨ Modern UI**: Glass-morphism design with gradients and smooth animations
- **🎯 Live Updates**: NFTs automatically refresh after minting transactions

## 🎨 NFT Properties & Traits

Each Dye NFT has the following dynamic traits:

| Trait | Description | Dynamic |
|-------|-------------|---------|
| **Hue** | Base color (0-360°) | ✅ Owner + Balance + Block |
| **Shape** | Circle vs Rounded Rectangle | ✅ Block parity |
| **Orbit Speed** | Animation speed | ✅ Owner balance |
| **Starfield** | Background stars | ✅ Token ID + Owner |
| **Ring Colors** | Orbital ring colors | ✅ Dynamic HSL |
| **Block Number** | Current block | ✅ Real-time |
| **Owner Balance** | ETH holdings | ✅ Real-time |

## 🔧 Technical Details

### Contract Specifications

- **Solidity Version**: ^0.8.28
- **Standards**: ERC721, ERC165
- **Libraries**: OpenZeppelin Contracts (v4+)
- **Encoding**: Base64 encoded JSON metadata
- **Image Format**: SVG with CSS animations

### Gas Optimization

- Pure functions for SVG generation
- Efficient string concatenation
- Minimal storage usage (only token ownership)
- Batch operations where possible

### Security Features

- Uses OpenZeppelin libraries (Ownable, ReentrancyGuard) for standard protections where applicable
- Token transfers follow ERC721 semantics (token owners can transfer their tokens)
- Input validation and explicit checks on external inputs

## 🧪 Testing

Run the comprehensive test suite:

```bash
cd contracts
npm test
```

Tests cover:
- ✅ Contract deployment
- ✅ NFT minting
- ✅ TokenURI generation
- ✅ Metadata parsing
- ✅ SVG validation
- ✅ Dynamic property calculation

## 🚢 Deployment

### Local Network
```bash
cd contracts
npm run dev    # Terminal 1: Start network
npm run local  # Terminal 2: Deploy + mint
```
## 📚 API Reference

### Smart Contract Functions

#### `mint()`
Mints a new Dye NFT to the caller.
```solidity
function mint() external returns (uint256 tokenId)
```

#### `tokenURI(uint256 tokenId)`
Returns the complete metadata URI for the NFT.
```solidity
function tokenURI(uint256 tokenId) public view returns (string memory)
```

### Frontend Components

#### NFT Viewer
- Input: Contract address + Token ID
- Output: Live animated SVG + metadata
- Features: Real-time updates, error handling

### Development Setup

```bash
# Install all dependencies
npm install
cd contracts && npm install
cd ../frontend && npm install

# Run tests
cd contracts && npm test

# Start development
npm run dev  # Contracts
cd frontend && npm run dev  # Frontend
```

## 🙏 Acknowledgments

### Smart Contract
- **OpenZeppelin** for secure, audited smart contracts
- **Hardhat** for Ethereum development tools

### Frontend
- **React** for building interactive user interfaces
- **Vite** for lightning-fast development and building
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for beautiful, accessible components
- **Wagmi** for seamless Web3 wallet integration
- **Viem** for TypeScript-first Ethereum interactions

---

