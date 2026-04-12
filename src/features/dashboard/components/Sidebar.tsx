'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wallet, LayoutDashboard, ArrowLeftRight, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Transações',
    href: '/transactions',
    icon: ArrowLeftRight,
  },
];

const footerItem = {
  label: 'Configurações',
  href: '/settings',
  icon: Settings,
};

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden md:flex w-72 h-screen bg-surface-container flex-col flex-shrink-0">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <Wallet className="w-5 h-5 text-primary" />
        </div>
        <span className="font-display font-semibold text-xl text-on-surface text-primary">
          FinanceGuy
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navigationItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors',
                active
                  ? 'text-primary bg-surface-container-low'
                  : 'text-on-surface text-neutral hover:bg-surface-container-low'
              )}
            >
              <Icon
                className={cn(
                  'w-5 h-5 transition-colors',
                  active ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'
                )}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 pt-0">
        <Link
          href={footerItem.href}
          className={cn(
            'group flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors',
            isActive(footerItem.href)
              ? 'text-primary bg-surface-container-low'
              : 'text-on-surface hover:bg-surface-container-low'
          )}
        >
          <Settings
           className='text-neutral'
          />
          <span className="text-sm text-neutral font-medium">{footerItem.label}</span>
        </Link>
      </div>
    </aside>
  );
}