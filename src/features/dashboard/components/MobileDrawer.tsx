'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { logoutAction } from '@/features/auth/actions/logoutAction';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', testid: 'nav-dashboard' },
  { label: 'Transações', href: '/transactions', testid: 'nav-transactions' },
];

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const router = useRouter();
  
  const handleLogout = async () => {
    onClose();
    await logoutAction();
  };

  const handleLinkClick = (href: string) => {
    onClose();
    router.push(href);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        data-testid="drawer-backdrop"
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div
        data-testid="drawer-content"
        data-side="left"
        role="dialog"
        aria-label="Menu de navegação"
        tabIndex={-1}
        className="fixed left-0 top-0 h-full w-64 bg-surface-container border-r border-outline-variant z-50 animate-slide-in"
      >
        {/* Close Button */}
        <button
          data-testid="drawer-close"
          onClick={onClose}
          aria-label="Fechar menu"
          className="absolute top-4 right-4 p-2 text-foreground hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Navigation Content */}
        <div className="pt-16 px-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.testid}
                data-testid={item.testid}
                onClick={() => handleLinkClick(item.href)}
                className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-outline-variant/30 rounded-lg transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            data-testid="btn-logout"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-outline-variant/30 rounded-lg transition-colors mt-4"
          >
            <X className="h-5 w-5" />
            Sair
          </button>
        </div>
      </div>
    </>
  );
}