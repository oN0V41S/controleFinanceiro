import type { Metadata } from "next";
import "./global.css"; // Você precisará criar este arquivo para o Tailwind

export const metadata: Metadata = {
  title: "Controle Financeiro",
  description: "Gerencie suas finanças de forma simples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}