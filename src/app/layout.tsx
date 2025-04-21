// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Server-side only
export const metadata: Metadata = {
  title: "Xcope - Corretora de Seguros",
  description: "Plataforma de gestão de seguros",
};

const inter = Inter({ subsets: ["latin"] });

// 👇 Move the client-specific logic into a wrapper
import RootLayoutClient from "./RootLayoutClient";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className={inter.className}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}