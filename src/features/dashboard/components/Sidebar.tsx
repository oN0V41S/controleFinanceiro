'use client';

import { Home, LogOut, Receipt } from 'lucide-react';
import { logoutAction } from '@/features/auth/actions/logoutAction';

const navItems = [
  { label: 'Dashboard', icon: Home, href: '/dashboard', testid: 'nav-dashboard' },
  { label: 'Transações', icon: Receipt, href: '/transactions', testid: 'nav-transactions' },
];

export function Sidebar() {
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <aside
      data-testid="sidebar"
      className="w-64 h-screen bg-surface-container border-r border-outline-variant flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-outline-variant">
        <h1 className="font-display text-xl text-white">FinanceGuy</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.testid}
            data-testid={item.testid}
            href={item.href}
            className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-outline-variant/30 rounded-lg transition-colors text-left"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </a>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-outline-variant">
        <button
          data-testid="btn-logout"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-outline-variant/30 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </button>
      </div>
    </aside>
  );
}