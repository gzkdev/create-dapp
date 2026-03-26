'use client';

export default function Page() {
  return (
    <div className="mx-auto max-w-xl p-6 text-center">
      <h1 className="text-xl leading-tight font-medium tracking-tight sm:text-3xl">
        Wagmi + Next.js
      </h1>

      <p className="text-foreground/60 mt-4 mb-12">
        Non-opinionated template for building apps on EVM-compatible
        blockchains. Made with{' '}
        <a
          href="https://www.npmjs.com/package/@gzkdev/create-dapp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          create-dapp
        </a>{' '}
        by{' '}
        <a
          href="https://github.com/gzkdev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          @gzkdev
        </a>
      </p>

      <p>
        Edit{' '}
        <code className="rounded-xs bg-blue-500 px-1 font-mono font-semibold text-blue-50">
          src/app/page.tsx
        </code>{' '}
        to get started.
      </p>
    </div>
  );
}
