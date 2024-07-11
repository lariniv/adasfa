"use client";
import "@/app/globals.css";
import HeaderDashboard from "@/app/components/HeaderDashboard";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <main className="flex flex-col items-center">
        <HeaderDashboard />
        {children}
      </main>
    </Provider>
  );
}
