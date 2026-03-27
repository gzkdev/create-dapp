# Sui DApp Starter (Vite)

A minimal, premium Vite starter for the Sui network, scaffolded with `create-dapp`.

## Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) + React
- **Web3**: [@mysten/dapp-kit-react](https://sdk.mystenlabs.com/dapp-kit), [@mysten/sui](https://sdk.mystenlabs.com/sui-sdk)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Wallet**: Integrated connection state management

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open the displayed local URL to see the result.

## Project Structure

- `index.html`: Standardized metadata and entry point.
- `src/App.tsx`: Premium landing page with wallet integration.
- `src/components/providers.tsx`: Consolidated network and client providers.

## Credits

Scaffolded with [create-dapp](https://www.npmjs.com/package/@gzkdev/create-dapp) by [@gzkdev](https://github.com/gzkdev).
