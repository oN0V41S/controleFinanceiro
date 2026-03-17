export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Animated Wallet Icon with Spin */}
        <div className="relative">
          <div className="w-20 h-20 bg-[#064E3B] rounded-2xl flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-10 h-10 text-white animate-spin" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[#334155] font-medium text-lg">Carregando</span>
          <span className="flex gap-1.5">
            <span className="w-2 h-2 bg-[#064E3B] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-[#064E3B] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-[#064E3B] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </span>
        </div>
      </div>
    </div>
  );
}
