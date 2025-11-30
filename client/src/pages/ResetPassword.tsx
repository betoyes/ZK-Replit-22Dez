import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Lock, Eye, EyeOff, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PasswordStrengthIndicator } from "@/components/ui/password-strength-indicator";
import { isPasswordValid } from "@shared/passwordStrength";

export default function ResetPassword() {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get("token");

    if (!tokenParam) {
      setIsValidating(false);
      setTokenError("Token de recuperação não encontrado.");
      return;
    }

    setToken(tokenParam);

    fetch(`/api/auth/validate-reset-token?token=${tokenParam}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && data.valid) {
          setIsTokenValid(true);
        } else {
          setTokenError(data.message || "Token inválido ou expirado.");
        }
      })
      .catch(() => {
        setTokenError("Erro ao validar token. Tente novamente.");
      })
      .finally(() => {
        setIsValidating(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    if (!isPasswordValid(password)) {
      toast({
        title: "Erro",
        description: "A senha não atende aos requisitos de segurança.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
      } else {
        toast({
          title: "Erro",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao redefinir senha. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 border border-gray-200 text-center">
          <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-gray-400" />
          <h1 className="text-2xl font-light tracking-wide mb-2">Validando...</h1>
          <p className="text-gray-500">Aguarde enquanto validamos seu link.</p>
        </div>
      </div>
    );
  }

  if (!isTokenValid && !isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 border border-gray-200 text-center">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-light tracking-wide mb-2">Link Inválido</h1>
          <p className="text-gray-500 mb-6">{tokenError}</p>
          <div className="space-y-3">
            <Link href="/forgot-password">
              <Button 
                className="w-full bg-black text-white hover:bg-gray-800"
                data-testid="button-request-new"
              >
                Solicitar Novo Link
              </Button>
            </Link>
            <Link href="/login">
              <Button 
                variant="outline"
                className="w-full"
                data-testid="button-go-to-login"
              >
                Voltar para o Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 border border-gray-200 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h1 className="text-2xl font-light tracking-wide mb-2">Senha Redefinida!</h1>
          <p className="text-gray-500 mb-6">
            Sua senha foi alterada com sucesso. Você já pode fazer login com a nova senha.
          </p>
          <Link href="/login">
            <Button 
              className="w-full bg-black text-white hover:bg-gray-800"
              data-testid="button-go-to-login"
            >
              Fazer Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light tracking-wide mb-2">Redefinir Senha</h1>
          <p className="text-gray-500 text-sm">
            Escolha uma nova senha para sua conta.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="password" className="text-sm font-medium">Nova Senha</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                placeholder="Mínimo 8 caracteres"
                data-testid="input-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {password && <PasswordStrengthIndicator password={password} />}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar Senha</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10"
                placeholder="Digite a senha novamente"
                data-testid="input-confirm-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800"
            disabled={isLoading}
            data-testid="button-submit"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Redefinindo...
              </>
            ) : (
              "Redefinir Senha"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
