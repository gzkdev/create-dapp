# create-dapp

A CLI tool to scaffold minimal and slightly opinionated DApps.

This monorepo is powered by [Turborepo](https://turbo.build/) and [pnpm](https://pnpm.io/) for efficient workspace management, with automated releases handled by [Changesets](https://changesets.js.org/).

## Monorepo Structure

- **`packages/cli`**: The core `@gzkdev/create-dapp` CLI tool, built with Commander and Clack.
- **`packages/cli/templates`**: Standardized, high-quality DApp templates for various blockchain networks (EVM, Solana, Sui) and frameworks (Next.js, Vite).
- **Tooling**: Shared ESLint, TypeScript, and Prettier configurations maintained via workspace packages.

## Getting Started

### Using the CLI

To scaffold a new DApp, run:

```bash
npx @gzkdev/create-dapp@latest
```

### Local Development

1. **Install dependencies**:
   ```bash
   pnpm install
   ```
2. **Start development mode**:
   ```bash
   pnpm dev
   ```
   This will run the CLI builder (tsup) in watch mode.

## Contribution Guide

### Adding a Template

1. Create a new directory in `packages/cli/templates`.
2. Follow the existing template structure (Next.js or Vite).
3. Update `packages/cli/src/cli.ts` to include the new template in the `templateOptions` prompt.

### Releasing Changes

This project uses Changesets for versioning and releases.

1. Run `pnpm changeset` to document your changes.
2. Commit the generated changeset file.
3. Once merged to `main`, GitHub Actions will automatically create a version PR or publish to npm.

## License

MIT © [gzkdev](https://github.com/gzkdev)
