'use client';

import { render, screen } from '@testing-library/react';

// Mock components
jest.mock('@/features/dashboard/components/DashboardLayout', () => ({
  DashboardLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  ),
}));

jest.mock('@/features/dashboard/components/Sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

jest.mock('@/features/dashboard/components/HeaderLayout', () => ({
  HeaderLayout: () => <header data-testid="header">Header</header>,
}));

jest.mock('@/features/dashboard/components/MobileNavBar', () => ({
  MobileNavBar: () => <nav data-testid="mobile-navbar">MobileNavBar</nav>,
}));

jest.mock('@/features/dashboard/components/MobileDrawer', () => ({
  MobileDrawer: () => <div data-testid="mobile-drawer">MobileDrawer</div>,
}));

jest.mock('@/shared/hooks/useFinanceData', () => ({
  __esModule: true,
  default: () => ({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    chartData: [],
    categories: [],
    openModal: jest.fn(),
  }),
}));

// Import mocks after defining them
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout';
import { Sidebar } from '@/features/dashboard/components/Sidebar';
import { HeaderLayout } from '@/features/dashboard/components/HeaderLayout';
import { MobileNavBar } from '@/features/dashboard/components/MobileNavBar';

describe('DashboardPage Integration', () => {
  it('renderiza Sidebar', () => {
    render(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('renderiza HeaderLayout', () => {
    render(<HeaderLayout />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renderiza MobileNavBar', () => {
    render(<MobileNavBar />);
    expect(screen.getByTestId('mobile-navbar')).toBeInTheDocument();
  });

  it('renderiza DashboardLayout', () => {
    render(
      <DashboardLayout>
        <Sidebar />
        <div>Content</div>
        <MobileNavBar />
      </DashboardLayout>
    );
    expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-navbar')).toBeInTheDocument();
  });
});