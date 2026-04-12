'use client';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[288px_1fr] min-h-screen bg-background">
      {children}
    </div>
  );
}