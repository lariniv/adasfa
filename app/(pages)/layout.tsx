import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { Metadata } from 'next';
import StoreProvider from './StoreProvider';
import HeaderDashboard from '../components/HeaderDashboard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zenith AI',
  description:
    'Zenith AI is a platform that provides AI solutions for businesses.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en" className={inter.className}>
        <body className="lg:overflow-auto">{children}</body>
      </html>
    </StoreProvider>
  );
}
