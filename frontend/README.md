# 🖌️ Dye NFT Frontend

A modern React application for viewing and minting dynamic on-chain SVG NFTs.

## 🚀 Features

- **🎨 Dynamic NFT Gallery**: View your collection of animated SVG NFTs
- **⚡ Real-time Minting**: Mint new NFTs with automatic gallery refresh
- **🌙 Dark/Light Theme**: Automatic theme switching with system preference
- **📱 Responsive Design**: Works seamlessly on all devices
- **🔗 Wallet Integration**: Connect with MetaMask and other Web3 wallets

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS 4** for styling
- **Wagmi** for Web3 integration
- **shadcn/ui** components
- **Viem** for Ethereum interactions

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask or compatible Web3 wallet

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env` file with your contract address:

```env
VITE_CONTRACT_ADDRESS=0x...
```

## 🎯 Usage

1. **Connect Wallet**: Click "Connect Wallet" to link your Web3 wallet
2. **Mint NFTs**: Use the "Mint NFT" button to create new dynamic NFTs
3. **View Collection**: Your minted NFTs automatically appear in the gallery
4. **Real-time Updates**: NFTs evolve based on blockchain data and owner balance

## 🏗️ Project Structure

```
src/
├── components/ui/     # Reusable UI components (shadcn/ui)
├── hooks/            # Custom React hooks
│   ├── useMint.ts    # NFT minting logic
│   ├── useLoadNFTs.ts # NFT gallery loading
│   └── useMetaMaskConnect.ts # Wallet connection
├── lib/              # Utilities and providers
└── App.tsx          # Main application component
```

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Development

The application automatically refreshes when you mint new NFTs, displaying them immediately in your gallery. All styling uses Tailwind CSS with a modern design system supporting both light and dark themes.

## 📄 License

MIT License
