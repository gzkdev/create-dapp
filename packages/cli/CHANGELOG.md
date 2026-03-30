# @gzkdev/create-dapp

## 1.1.0

### Minor Changes

- 0bf4cf4: Major refactor of the CLI to use 'prompts' and 'ora' for a better UX. Added support for 'AGENTS.md' inclusion in Next.js projects and integrated 'commander' for argument-based scaffolding.

## 1.0.4

### Patch Changes

- 1416022: Removed hardcoded Git author identity to respect local user configuration, improved Git initialization error handling to be non-fatal, and enhanced CLI project path logic for better scaffolding UX.

## 1.0.3

### Patch Changes

- d686928: Fix ENOENT error with npm/git, implement direct package manager detection, and follow conventional commits for the initial project scaffold.

## 1.0.2

### Patch Changes

- b960276: Include templates in npm package, handle .gitignore and .env.local publishing, and filter out .git folders during scaffolding.

## 1.0.1

### Patch Changes

- d539727: Refine CLI README header for better visibility and consistent branding.
- b4f3936: Refine project descriptions to "slightly opinionated", disable TanStack Start templates, and enhance monorepo documentation.
