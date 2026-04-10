import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  variable: "--font-inter", 
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({ 
  variable: "--font-sora", 
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ 
  variable: "--font-jetbrains-mono", 
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FinanceGuy - Controle Financeiro",
  description: "Gerencie suas finanças de forma simples e intuitiva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} antialiased bg-surface text-on-surface font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
