"use client";

interface PasswordRequirementsProps {
  passwordValue: string;
}

const requirements = [
  { key: "length", label: "Mínimo 8 caracteres", test: (pwd: string) => pwd.length >= 8 },
  { key: "uppercase", label: "Uma letra maiúscula", test: (pwd: string) => /[A-Z]/.test(pwd) },
  { key: "lowercase", label: "Uma letra minúscula", test: (pwd: string) => /[a-z]/.test(pwd) },
  { key: "number", label: "Um número", test: (pwd: string) => /\d/.test(pwd) },
  { key: "symbol", label: "Um símbolo (@$!%*?&)", test: (pwd: string) => /[@$!%*?&]/.test(pwd) },
];

export function PasswordRequirements({ passwordValue }: PasswordRequirementsProps) {
  const isEmpty = !passwordValue || passwordValue.length === 0;

  return (
    <div className="space-y-2 mt-3">
      <p className="text-xs text-gray-500 font-medium mb-2">Requisitos da senha:</p>
      <div className="grid grid-cols-1 gap-1.5">
        {requirements.map((req) => {
          const isValid = req.test(passwordValue);
          return (
            <div 
              key={req.key} 
              className={`flex items-center gap-2 text-xs transition-colors duration-200 ${
                isEmpty ? "text-gray-400" : isValid ? "text-[#10B981]" : "text-[#E11D48]"
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                isEmpty 
                  ? "bg-gray-100" 
                  : isValid 
                    ? "bg-[#10B981] text-white" 
                    : "bg-[#E11D48]/20 text-[#E11D48]"
              }`}>
                {isEmpty ? "○" : isValid ? "✓" : "✕"}
              </span>
              <span className={isValid && !isEmpty ? "line-through" : ""}>{req.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
