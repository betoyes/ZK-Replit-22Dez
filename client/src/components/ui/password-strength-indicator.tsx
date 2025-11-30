import { useMemo } from 'react';
import { validatePassword, getPasswordStrengthColor, getPasswordStrengthLabel, type PasswordValidation } from '@shared/passwordStrength';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
  showRequirements?: boolean;
}

export function PasswordStrengthIndicator({ password, showRequirements = true }: PasswordStrengthIndicatorProps) {
  const validation = useMemo(() => validatePassword(password), [password]);
  
  if (!password) return null;
  
  const strengthColor = getPasswordStrengthColor(validation.strength);
  const strengthLabel = getPasswordStrengthLabel(validation.strength);
  const strengthPercentage = (validation.score / 5) * 100;
  
  return (
    <div className="space-y-2 mt-2" data-testid="password-strength-indicator">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-300 rounded-full"
            style={{ 
              width: `${strengthPercentage}%`,
              backgroundColor: strengthColor 
            }}
          />
        </div>
        <span 
          className="text-xs font-medium min-w-[50px] text-right"
          style={{ color: strengthColor }}
          data-testid="password-strength-label"
        >
          {strengthLabel}
        </span>
      </div>
      
      {showRequirements && validation.feedback.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-gray-500 font-medium">Requisitos faltando:</p>
          <ul className="space-y-0.5">
            {validation.feedback.map((item, index) => (
              <li 
                key={index} 
                className="flex items-center gap-1.5 text-xs text-gray-500"
                data-testid={`requirement-${index}`}
              >
                <X className="w-3 h-3 text-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {showRequirements && validation.score === 5 && (
        <div className="flex items-center gap-1.5 text-xs text-green-600" data-testid="all-requirements-met">
          <Check className="w-3 h-3" />
          Todos os requisitos atendidos
        </div>
      )}
    </div>
  );
}

export function usePasswordValidation(password: string): PasswordValidation {
  return useMemo(() => validatePassword(password), [password]);
}
