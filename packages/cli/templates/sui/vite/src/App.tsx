import {
  useDAppKit,
  useWalletConnection,
  useWallets,
} from '@mysten/dapp-kit-react';

function App() {
  const wallets = useWallets();
  const { account, isConnecting, wallet } = useWalletConnection();
  const { connectWallet, disconnectWallet } = useDAppKit();

  const address = account?.address;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-white text-[#171717] dark:bg-[#0a0a0a] dark:text-[#ededed]">
      <main className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col gap-10 border-x border-black/5 px-6 py-16 dark:border-white/5">
        <header className="space-y-3">
          <p className="text-sm font-medium tracking-[0.18em] text-black/50 uppercase dark:text-white/50">
            Sui starter kit
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Ship a Sui DApp fast
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-black/60 dark:text-white/60">
            Scaffolded with <code className="font-mono">create-dapp</code>, a
            modern DApp starter by{' '}
            <a
              href="https://github.com/gzkdev"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 decoration-black/20 transition hover:decoration-black/40 dark:decoration-white/20 dark:hover:decoration-white/40"
            >
              @gzkdev
            </a>
            . Includes pre-configured{' '}
            <code className="font-mono">@mysten/dapp-kit-react</code> and wallet
            connection, giving you a developer experience from day zero.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-2 w-2 rounded-full bg-black/40 dark:bg-white/40"
                aria-hidden
              />
              <div className="text-black/80 dark:text-white/80">
                <a
                  className="font-medium underline underline-offset-2"
                  href="https://sdk.mystenlabs.com/dapp-kit"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sui dApp-kit docs
                </a>{' '}
                — the official React hooks library for Sui developers.
              </div>
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-2 w-2 rounded-full bg-black/40 dark:bg-white/40"
                aria-hidden
              />
              <div className="text-black/80 dark:text-white/80">
                <a
                  className="font-medium underline underline-offset-2"
                  href="https://docs.sui.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sui docs
                </a>{' '}
                — core concepts, Move programming language, and CLI patterns.
              </div>
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-2 w-2 rounded-full bg-black/40 dark:bg-white/40"
                aria-hidden
              />
              <div className="text-black/80 dark:text-white/80">
                <a
                  className="font-medium underline underline-offset-2"
                  href="https://faucet.testnet.sui.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sui faucet (testnet)
                </a>{' '}
                — grab free testnet SUI to try out minting and transfers.
              </div>
            </li>
          </ul>
        </header>

        <section className="w-full max-w-3xl space-y-4 rounded-2xl border border-black/5 bg-black/2 p-6 dark:border-white/5 dark:bg-white/2">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-lg font-semibold">Wallet connection</p>
              <p className="text-sm text-black/50 dark:text-white/50">
                Pick any discovered connector and manage connect / disconnect in
                one spot.
              </p>
            </div>
            <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold tracking-wide text-black/80 uppercase dark:bg-white/5 dark:text-white/80">
              {account ? 'Connected' : 'Not connected'}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {wallets.map((walletItem) => (
              <button
                key={walletItem.name}
                onClick={() => connectWallet({ wallet: walletItem })}
                disabled={isConnecting}
                className="group flex items-center justify-between rounded-xl border border-black/5 bg-white px-4 py-3 text-left text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/5 dark:bg-white/5"
              >
                <span className="flex flex-col">
                  <span className="text-base">{walletItem.name}</span>
                  <span className="text-xs text-black/50 dark:text-white/50">
                    {isConnecting
                      ? 'Connecting…'
                      : account && wallet?.name === walletItem.name
                        ? 'Active'
                        : 'Tap to connect'}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rounded-full bg-black/10 transition group-hover:bg-blue-400/80 dark:bg-white/10"
                />
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-black/5 pt-4 text-sm dark:border-white/5">
            <span className="rounded-lg border border-black/5 bg-black/5 px-3 py-2 font-mono text-xs dark:border-white/5 dark:bg-white/5">
              {address ?? 'No wallet connected'}
            </span>
            <button
              onClick={() => disconnectWallet()}
              disabled={!account}
              className="inline-flex items-center gap-2 rounded-lg border border-black/5 bg-white px-3 py-2 font-medium transition hover:-translate-y-0.5 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/5 dark:bg-white/5"
            >
              Disconnect
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
