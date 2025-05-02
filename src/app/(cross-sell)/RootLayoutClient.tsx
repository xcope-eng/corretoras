// src/app/RootLayoutClient.tsx
'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/app/(cross-sell)/components/Sidebar/Sidebar';

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <div className="flex min-h-screen">
      {!isLandingPage && <Sidebar />}
      <main className={`flex-1 ${!isLandingPage ? 'ml-64' : ''}`}>
        {children}
      </main>
    </div>
  );
}