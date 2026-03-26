function App() {
  return (
    <div className="text-foreground/60 mx-auto max-w-2xl p-6 text-center">
      <h1 className="text-foreground text-xl leading-tight font-medium tracking-tight sm:text-3xl">
        Sui + Vite
      </h1>

      <p className="mt-4 mb-20 sm:text-lg">
        Non-opinionated template for building apps on Sui. Made with{' '}
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

      <div className="mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {/* Sui Connect Button can be added here */}
      </div>

      <p>
        Edit{' '}
        <code className="bg-foreground/50 text-background rounded-sm px-1 font-mono font-medium">
          src/App.tsx
        </code>{' '}
        to get started.
      </p>
    </div>
  );
}

export default App;
