# EVM dApp Starter (Vite)

A minimal, premium Vite starter for EVM-compatible networks, scaffolded with `create-dapp`.

## Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) + React
- **Web3**: [Wagmi](https://wagmi.sh/), [Viem](https://viem.sh/)
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
- `src/components/providers.tsx`: Consolidated network and query providers with SSR isolation support.

## Credits

Scaffolded with `create-dapp` by [@gzkdev](https://github.com/gzkdev).
