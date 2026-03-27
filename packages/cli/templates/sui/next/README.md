# Sui DApp Starter (Next.js)

A minimal Next.js starter for the Sui network, scaffolded with `create-dapp`.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
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

3. Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

- `src/app/layout.tsx`: Standardized metadata and layout.
- `src/app/page.tsx`: landing page with wallet integration.
- `src/components/providers.tsx`: Consolidated network and client providers with hydration fix.

## Credits

Scaffolded with [create-dapp](https://www.npmjs.com/package/@gzkdev/create-dapp) by [@gzkdev](https://github.com/gzkdev).
