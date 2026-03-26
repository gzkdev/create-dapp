import { type ReactNode, useState } from 'react';
import { autoDiscover, createClient } from '@solana/client';
import { SolanaProvider } from '@solana/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = createClient({
  endpoint: 'https://api.devnet.solana.com',
  walletConnectors: autoDiscover(),
});

export function WalletsProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SolanaProvider client={client}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SolanaProvider>
  );
}
