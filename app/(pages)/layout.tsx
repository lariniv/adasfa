import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zenith AI",
  description:
    "Zenith AI is a platform that provides AI solutions for businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="lg:overflow-auto">{children}</body>
    </html>
  );
}
