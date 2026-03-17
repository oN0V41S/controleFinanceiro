/**
 * Loading spinner for the dashboard page
 * Uses brand colors: Deep Emerald #064E3B (primary) and Ice White #F8FAFC (background)
 */
export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#F8FAFC] border-t-[#064E3B]" />
          
          {/* Inner pulsing circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 animate-pulse rounded-full bg-[#064E3B]" />
          </div>
        </div>
        
        {/* Loading text */}
        <p className="text-sm font-medium text-[#064E3B] animate-pulse">
          Carregando dashboard...
        </p>
      </div>
    </div>
  );
}
