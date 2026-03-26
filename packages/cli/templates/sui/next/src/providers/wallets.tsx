'use client';

import type { ReactNode } from 'react';
import { DAppKitProvider } from '@mysten/dapp-kit-react';
import { dAppKit } from '@/config/dappkit';

export function WalletsProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <DAppKitProvider dAppKit={dAppKit}>{children}</DAppKitProvider>;
}
