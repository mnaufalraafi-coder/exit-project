import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "EXIT — Early Investment Take Over",
  description:
    "Platform perantara take-over posisi investasi pada instrumen P2P Lending dan Securities Crowdfunding (SCF).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
