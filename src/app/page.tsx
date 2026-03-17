// src/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  PieChart, 
  TrendingUp, 
  CreditCard, 
  Shield, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Controle Total",
    description: "Gerencie suas receitas e despesas em um só lugar com facilidade."
  },
  {
    icon: PieChart,
    title: "Categorização Inteligente",
    description: "Organize suas transações por categorias personalizadas."
  },
  {
    icon: TrendingUp,
    title: "Análises Detalhadas",
    description: "Visualize gráficos e relatórios para entender suas finanças."
  },
  {
    icon: CreditCard,
    title: "Controle de Parcelas",
    description: "Acompanhe compras parceladas e evite surpresas no orçamento."
  },
  {
    icon: Shield,
    title: "Segurança em Primeiro Lugar",
    description: "Seus dados protegidos com criptografia de ponta."
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#064E3B] rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-[#334155]">FinanceGuy</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-[#334155]">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-[#064E3B] hover:bg-[#064E3B]/90 text-white">Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#064E3B]/10 text-[#064E3B] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#064E3B] rounded-full animate-pulse"></span>
            Sua gestão financeira pessoal
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-[#334155] mb-6 leading-tight">
            FinanceGuy
            <span className="block text-[#064E3B]">simplificado e inteligente</span>
          </h1>
          
          <p className="text-xl text-[#334155]/70 mb-10 max-w-2xl mx-auto">
            Tome o controle das suas finanças pessoais com uma ferramenta poderosa, 
            fácil de usar e que se adapta às suas necessidades.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 bg-[#064E3B] hover:bg-[#064E3B]/90 text-white">
                Começar Gratuitamente
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-6 border-[#064E3B] text-[#064E3B] hover:bg-[#064E3B]/5">
                Já tenho conta
              </Button>
            </Link>
          </div>
          
          <p className="mt-4 text-sm text-gray-500">
            Sem cartão de crédito requiredo • Comece em menos de 1 minuto
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#334155] mb-4">
              Tudo o que você precisa para organizar suas finanças
            </h2>
            <p className="text-lg text-[#334155]/70 max-w-2xl mx-auto">
              Funcionalidades pensadas para facilitar sua vida e ajudar você a alcançar seus objetivos financeiros.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-[#F8FAFC] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-[#064E3B]/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#064E3B]" />
                </div>
                <h3 className="text-xl font-semibold text-[#334155] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#334155]/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#064E3B] rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para transformar sua vida financeira?
            </h2>
            <p className="text-[#F8FAFC]/70 text-lg mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já estão tomando controle das suas finanças com o FinanceGuy.
            </p>
            <Link href="/register">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-base px-8 py-6 bg-white text-[#064E3B] hover:bg-[#F8FAFC]"
              >
                Criar Conta Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#064E3B] rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-[#334155]">FinanceGuy</span>
            </div>
            <p className="text-sm text-[#334155]/60">
              © 2026 FinanceGuy. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
