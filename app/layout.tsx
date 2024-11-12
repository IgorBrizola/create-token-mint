import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppWalletProvider from "./components/AppWalletProvider";
import Header from "./components/header";
import RetroGrid from "@/components/ui/retro-grid";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ClientOnly from "./components/ClientOnly";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Mint Token",
  description: "Generated mint token",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/solana-sol-logo.png" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-y-hidden`}
      >
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <AppWalletProvider>
              <Header />
              <ClientOnly>{children}</ClientOnly>
              <RetroGrid angle={70} />
            </AppWalletProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
