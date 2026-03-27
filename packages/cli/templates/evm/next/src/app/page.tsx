'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function Home() {
  const { address, status } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-white text-[#171717] dark:bg-[#0a0a0a] dark:text-[#ededed]">
      <main className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col gap-10 border-x border-black/5 px-6 py-16 dark:border-white/5">
        <header className="space-y-3">
          <p className="text-sm font-medium tracking-[0.18em] text-black/50 uppercase dark:text-white/50">
            EVM starter kit
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Ship an EVM DApp fast
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
            . Includes pre-configured <code className="font-mono">wagmi</code>,{' '}
            <code className="font-mono">viem</code> and wallet connection,
            giving you a developer experience from day zero.
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
                  href="https://wagmi.sh"
                  target="_blank"
                  rel="noreferrer"
                >
                  Wagmi docs
                </a>{' '}
                — the definitive reactive hooks library for Ethereum.
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
                  href="https://viem.sh"
                  target="_blank"
                  rel="noreferrer"
                >
                  Viem docs
                </a>{' '}
                — lightweight, composable, and type-safe modules for Ethereum.
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
                  href="https://sepolia.etherscan.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sepolia explorer
                </a>{' '}
                — track your testnet transactions and contract interactions.
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
              {status === 'connected' ? 'Connected' : 'Not connected'}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                disabled={status === 'connecting'}
                className="group flex items-center justify-between rounded-xl border border-black/5 bg-white px-4 py-3 text-left text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/5 dark:bg-white/5"
              >
                <span className="flex flex-col">
                  <span className="text-base">{connector.name}</span>
                  <span className="text-xs text-black/50 dark:text-white/50">
                    {status === 'connecting'
                      ? 'Connecting…'
                      : status === 'connected' && address
                        ? 'Active'
                        : 'Tap to connect'}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rounded-full bg-black/10 transition group-hover:bg-blue-500/80 dark:bg-white/10"
                />
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-black/5 pt-4 text-sm dark:border-white/5">
            <span className="rounded-lg border border-black/5 bg-black/5 px-3 py-2 font-mono text-xs dark:border-white/5 dark:bg-white/5">
              {address ?? 'No wallet connected'}
            </span>
            <button
              onClick={() => disconnect()}
              disabled={status !== 'connected'}
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
