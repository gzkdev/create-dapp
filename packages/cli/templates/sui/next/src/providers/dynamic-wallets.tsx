'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const WalletsProviderBase = dynamic(
  () => import('./wallets').then((mod) => mod.WalletsProvider),
  { ssr: false },
);

export function DynamicWalletsProvider({ children }: { children: ReactNode }) {
  return <WalletsProviderBase>{children}</WalletsProviderBase>;
}
