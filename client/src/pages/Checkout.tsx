import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  firstName: z.string().min(2, "Nome é obrigatório"),
  lastName: z.string().min(2, "Sobrenome é obrigatório"),
  address: z.string().min(5, "Endereço inválido"),
  city: z.string().min(2, "Cidade obrigatória"),
  zip: z.string().min(5, "CEP inválido"),
  cardNumber: z.string().min(16, "Número do cartão inválido"),
  expiry: z.string().min(5, "Data inválida"),
  cvc: z.string().min(3, "CVC inválido"),
});

export default function Checkout() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      zip: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call
    setTimeout(() => {
      setStep(2);
      toast({
        title: "Pedido confirmado!",
        description: "Enviamos os detalhes para o seu email.",
      });
    }, 1500);
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4 pt-20">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 text-primary"
        >
          <CheckCircle2 className="h-24 w-24" />
        </motion.div>
        <h1 className="font-serif text-4xl mb-4">Obrigado pela sua compra!</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Seu pedido #ZK-8921 foi confirmado. Você receberá um email com os detalhes de rastreamento assim que o envio for processado.
        </p>
        <Link href="/">
          <Button className="rounded-none uppercase tracking-widest px-8">Voltar para Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-serif text-3xl mb-12 text-center">Checkout Seguro</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Form */}
          <div className="md:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Contact & Shipping */}
                <div className="space-y-4">
                  <h3 className="font-serif text-xl mb-4">1. Informações de Envio</h3>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com" {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Maria" {...field} className="bg-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sobrenome</FormLabel>
                          <FormControl>
                            <Input placeholder="Silva" {...field} className="bg-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input placeholder="Rua das Flores, 123" {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input placeholder="São Paulo" {...field} className="bg-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <Input placeholder="00000-000" {...field} className="bg-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Payment */}
                <div className="space-y-4 pt-8 border-t border-border">
                  <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
                    2. Pagamento <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </h3>
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número do Cartão</FormLabel>
                        <FormControl>
                          <Input placeholder="0000 0000 0000 0000" {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Validade</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/AA" {...field} className="bg-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVC</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} className="bg-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full rounded-none h-12 bg-black text-white hover:bg-primary uppercase tracking-widest mt-8">
                  Confirmar Pagamento
                </Button>
              </form>
            </Form>
          </div>

          {/* Summary */}
          <div>
             <div className="bg-secondary/20 p-8 sticky top-32">
              <h3 className="font-serif text-lg mb-6">Resumo</h3>
              <div className="space-y-4 text-sm border-b border-border pb-6 mb-6">
                <div className="flex justify-between">
                  <span>Anel Solitário Royal</span>
                  <span>R$ 12.500,00</span>
                </div>
                <div className="flex justify-between">
                  <span>Brincos Pérola Barroca</span>
                  <span>R$ 3.800,00</span>
                </div>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>R$ 16.300,00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
