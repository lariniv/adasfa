import '@/app/globals.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center">
      <Link
        target="_blank"
        href={'https://zenithai.substack.com/'}
        className="my-2 w-full z-50 bg-black/80 flex items-center justify-center h-10 hover:opacity-70 duration-300"
      >
        <p className="bg-clip-text font-semibold text-white/40 bg-zenith-gradient">
          Sign up for our Newsletter!
        </p>
      </Link>
      <Header />
      {children}
    </main>
  );
}
