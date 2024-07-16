'use client';
import '@/app/globals.css';
import HeaderDashboard from '@/app/components/HeaderDashboard';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center">
      <HeaderDashboard />
      {children}
    </main>
  );
}
