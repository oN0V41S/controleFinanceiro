import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#064E3B] rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-[#334155]">FinanceGuy</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm rounded-xl shadow-lg border-0">
          <CardContent className="pt-6">
            {children}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#064E3B] rounded-md flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-[#334155] text-sm">FinanceGuy</span>
            </div>
            <p className="text-xs text-[#334155]/60">
              © 2026 FinanceGuy. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
