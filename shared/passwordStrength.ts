export type PasswordStrength = 'weak' | 'medium' | 'strong';

export interface PasswordValidation {
  strength: PasswordStrength;
  score: number;
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
  feedback: string[];
}

export function validatePassword(password: string): PasswordValidation {
  const requirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const feedback: string[] = [];
  
  if (!requirements.minLength) {
    feedback.push('Mínimo de 8 caracteres');
  }
  if (!requirements.hasUppercase) {
    feedback.push('Uma letra maiúscula');
  }
  if (!requirements.hasLowercase) {
    feedback.push('Uma letra minúscula');
  }
  if (!requirements.hasNumber) {
    feedback.push('Um número');
  }
  if (!requirements.hasSpecialChar) {
    feedback.push('Um caractere especial (!@#$%^&*...)');
  }

  const score = Object.values(requirements).filter(Boolean).length;
  
  let strength: PasswordStrength;
  if (score <= 2) {
    strength = 'weak';
  } else if (score <= 4) {
    strength = 'medium';
  } else {
    strength = 'strong';
  }

  return {
    strength,
    score,
    requirements,
    feedback,
  };
}

export function isPasswordValid(password: string): boolean {
  const validation = validatePassword(password);
  return validation.requirements.minLength && validation.score >= 3;
}

export function getPasswordStrengthColor(strength: PasswordStrength): string {
  switch (strength) {
    case 'weak':
      return '#ef4444';
    case 'medium':
      return '#f59e0b';
    case 'strong':
      return '#22c55e';
  }
}

export function getPasswordStrengthLabel(strength: PasswordStrength): string {
  switch (strength) {
    case 'weak':
      return 'Fraca';
    case 'medium':
      return 'Média';
    case 'strong':
      return 'Forte';
  }
}
