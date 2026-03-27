# EVM DApp Starter (Next.js)

A minimal Next.js starter for EVM-compatible networks, scaffolded with `create-dapp`.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
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

3. Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

- `src/app/layout.tsx`: Standardized metadata and layout.
- `src/app/page.tsx`: landing page with wallet integration.
- `src/components/providers.tsx`: Consolidated network and query providers.

## Credits

Scaffolded with [create-dapp](https://www.npmjs.com/package/@gzkdev/create-dapp) by [@gzkdev](https://github.com/gzkdev).
