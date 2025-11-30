import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, Loader2, Mail } from 'lucide-react';
import { PasswordStrengthIndicator, usePasswordValidation } from '@/components/ui/password-strength-indicator';
import { isPasswordValid } from '@shared/passwordStrength';

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(5, "A senha deve ter no mínimo 5 caracteres"),
});

const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres").refine(
    (password) => isPasswordValid(password),
    { message: "A senha não atende aos requisitos de segurança" }
  ),
  confirmPassword: z.string().min(1, "Confirme sua senha"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login, isAuthenticated, isAdmin } = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  if (isAuthenticated) {
    setLocation(isAdmin ? '/admin/dashboard' : '/account');
    return null;
  }

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    try {
      if (isLogin) {
        const user = await login(values.email, values.password);
        toast({
          title: "Bem-vindo de volta",
          description: "Login efetuado com sucesso.",
        });
        if (user.role === 'admin') {
          setLocation('/admin/dashboard');
        } else {
          setLocation('/account');
        }
      } else {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: values.email, password: values.password, role: 'customer' }),
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Erro ao criar conta');
        }
        
        const data = await response.json();
        toast({
          title: "Conta criada com sucesso!",
          description: "Verifique seu email para confirmar sua conta antes de fazer login.",
        });
        setIsLogin(true);
        form.reset({ email: values.email, password: "", confirmPassword: "" });
      }
    } catch (error: any) {
      // Check if error is about email verification
      if (error.needsVerification) {
        setNeedsVerification(true);
        setUnverifiedEmail(error.email || values.email);
      } else {
        toast({
          variant: "destructive",
          title: isLogin ? "Falha no Login" : "Erro no Registro",
          description: error.message || "Credenciais inválidas.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: unverifiedEmail }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Email reenviado!",
          description: "Verifique sua caixa de entrada e spam.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro",
          description: data.message,
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível reenviar o email.",
      });
    } finally {
      setIsResending(false);
    }
  }

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    form.reset({ email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row pt-20">
      {/* Editorial Side */}
      <div className="hidden md:flex w-1/2 bg-black text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="z-10">
          <Link href="/" className="font-display text-3xl font-bold tracking-tighter">ZK REZK®</Link>
        </div>
        
        <div className="z-10 max-w-md space-y-6">
          <h2 className="font-display text-6xl leading-none tracking-tighter">
            Acesso<br/>Exclusivo
          </h2>
          <p className="font-mono text-sm text-white/60 uppercase tracking-widest">
            Gerencie seus pedidos, lista de desejos e tenha acesso antecipado aos lançamentos.
          </p>
        </div>

        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_60%)]" />
      </div>

      {/* Form Side */}
      <div className="w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-center bg-background">
        <div className="max-w-sm mx-auto w-full space-y-12">
          {needsVerification ? (
            <>
              <div className="text-center">
                <Mail className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h1 className="font-display text-4xl mb-2">Verifique seu Email</h1>
                <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-4">
                  Por favor, confirme seu email antes de fazer login.
                </p>
                <p className="text-muted-foreground text-sm mb-6">
                  Enviamos um link de verificação para <strong>{unverifiedEmail}</strong>
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="w-full rounded-none h-12 bg-black text-white hover:bg-black/80 uppercase tracking-widest font-mono text-xs"
                  data-testid="button-resend-verification"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Reenviando...
                    </>
                  ) : (
                    "Reenviar Email de Verificação"
                  )}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    setNeedsVerification(false);
                    setUnverifiedEmail("");
                    form.reset();
                  }}
                  className="w-full rounded-none h-12 uppercase tracking-widest font-mono text-xs"
                  data-testid="button-back-to-login"
                >
                  Voltar para Login
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <h1 className="font-display text-4xl mb-2">{isLogin ? 'Entrar' : 'Criar Conta'}</h1>
                <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
                  {isLogin ? 'Bem-vindo de volta ao círculo interno.' : 'Junte-se ao ZK REZK Archive.'}
                </p>
              </div>

              <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-widest">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="seu@email.com" 
                        {...field} 
                        className="rounded-none border-black h-12 bg-transparent" 
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-widest">Senha</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••" 
                        {...field} 
                        className="rounded-none border-black h-12 bg-transparent" 
                        data-testid="input-password"
                      />
                    </FormControl>
                    {!isLogin && field.value && (
                      <PasswordStrengthIndicator password={field.value} />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {!isLogin && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-xs uppercase tracking-widest">Confirmar Senha</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••" 
                          {...field} 
                          className="rounded-none border-black h-12 bg-transparent" 
                          data-testid="input-confirm-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isLogin && (
                <div className="text-right">
                  <Link 
                    href="/forgot-password"
                    className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-black transition-colors"
                    data-testid="link-forgot-password"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              )}
              
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full rounded-none h-12 bg-black text-white hover:bg-black/80 uppercase tracking-widest font-mono text-xs flex justify-between items-center px-6"
                data-testid="button-submit"
              >
                <span>{isLoading ? 'Aguarde...' : (isLogin ? 'Acessar Conta' : 'Criar Conta')}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </Form>

              <div className="text-center">
                <button 
                  onClick={handleModeSwitch}
                  className="font-mono text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity"
                  data-testid="button-toggle-mode"
                >
                  {isLogin ? 'Não tem uma conta? Registre-se' : 'Já tem conta? Entre'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
