import { createConfig, createStorage, http } from 'wagmi';
import { baseSepolia, sepolia } from 'wagmi/chains';

export function getConfig() {
  return createConfig({
    chains: [sepolia, baseSepolia],
    transports: {
      [sepolia.id]: http(),
      [baseSepolia.id]: http(),
    },
    storage: createStorage({
      storage: window.localStorage,
    }),
    ssr: false,
  });
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
