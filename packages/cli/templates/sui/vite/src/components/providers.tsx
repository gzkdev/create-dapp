import { type ReactNode } from 'react';
import { createDAppKit, DAppKitProvider } from '@mysten/dapp-kit-react';
import { SuiGrpcClient } from '@mysten/sui/grpc';

const GRPC_URLS = {
  mainnet: 'https://fullnode.mainnet.sui.io:443',
  testnet: 'https://fullnode.testnet.sui.io:443',
} as const;

const dAppKit = createDAppKit({
  enableBurnerWallet: import.meta.env.MODE === 'development',
  networks: ['mainnet', 'testnet'],
  defaultNetwork: 'testnet',
  createClient(network) {
    return new SuiGrpcClient({ network, baseUrl: GRPC_URLS[network] });
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return <DAppKitProvider dAppKit={dAppKit}>{children}</DAppKitProvider>;
}
