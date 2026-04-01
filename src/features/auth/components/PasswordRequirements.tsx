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

export function PasswordRequirements({ passwordValue = "" }: PasswordRequirementsProps) {
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
              className="flex items-center gap-2 text-xs transition-colors duration-200"
              data-testid={`password-requirement-${req.key}`}
            >
              <span
                className={isEmpty 
                  ? "bg-gray-100 w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                  : isValid 
                    ? "bg-[#10B981] text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                    : "bg-[#E11D48]/20 text-[#E11D48] w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                }
                aria-hidden="true"
              >
                {isEmpty ? "○" : isValid ? "✓" : "✕"}
              </span>
              <span 
                className={isValid && !isEmpty ? "line-through" : ""}
                aria-label={`${req.label}, ${isValid ? 'satisfeito' : 'não satisfeito'}`}
              >
                {req.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}