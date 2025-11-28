import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Entre em Contato</h1>
          <p className="text-muted-foreground">Estamos aqui para ajudar você a encontrar a joia perfeita.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto">
          <div>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome</label>
                  <Input className="bg-white" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input className="bg-white" placeholder="seu@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Assunto</label>
                <Input className="bg-white" placeholder="Como podemos ajudar?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mensagem</label>
                <Textarea className="bg-white min-h-[150px]" placeholder="Escreva sua mensagem..." />
              </div>
              <Button className="w-full rounded-none h-12 bg-black text-white hover:bg-primary uppercase tracking-widest">
                Enviar Mensagem
              </Button>
            </form>
          </div>

          <div className="bg-secondary/20 p-8 md:p-12 flex flex-col justify-center space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-lg mb-1">Atelier Principal</h3>
                <p className="text-muted-foreground">Rua Oscar Freire, 1234<br/>Jardins, São Paulo - SP</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-lg mb-1">Telefone</h3>
                <p className="text-muted-foreground">(11) 3000-0000<br/>Seg-Sex, 9h às 18h</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-lg mb-1">Email</h3>
                <p className="text-muted-foreground">contato@zkrezk.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
