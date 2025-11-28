import { useRoute, Link } from 'wouter';
import { products } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowLeft, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Product() {
  const [match, params] = useRoute('/product/:id');
  const { toast } = useToast();
  
  if (!match) return null;

  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-background text-foreground">
        <h1 className="font-display text-2xl">Artefato Não Encontrado</h1>
        <Link href="/shop"><Button variant="outline">Voltar ao Arquivo</Button></Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: "Adicionado à Sacola",
      description: `${product.name} foi reservado.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12">
           <Link href="/shop" className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" /> Voltar ao Arquivo
           </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Product Image - Sticky on Desktop */}
          <div className="lg:col-span-7 relative">
             <div className="sticky top-32 aspect-[3/4] bg-secondary overflow-hidden">
               <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover grayscale contrast-110"
              />
             </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="border-t border-black pt-4 mb-8">
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Coleção {product.collection}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Ref. {product.id.toString().padStart(4, '0')}
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight mb-6 leading-none">{product.name}</h1>
              <p className="font-mono text-xl">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>

            <p className="text-lg leading-relaxed mb-12 text-muted-foreground font-light">
              {product.description} Criado para a era moderna, esta peça exemplifica o equilíbrio entre matéria-prima e design refinado.
            </p>

            <div className="space-y-6 mb-16">
              <Button 
                size="lg" 
                className="w-full rounded-none h-16 bg-foreground text-background hover:bg-foreground/90 font-mono text-xs uppercase tracking-widest flex items-center justify-between px-8"
                onClick={handleAddToCart}
              >
                <span>Adicionar</span>
                <Plus className="h-4 w-4" />
              </Button>
              
              <div className="font-mono text-[10px] uppercase tracking-widest text-center text-muted-foreground">
                Envio Global Grátis • Garantia Vitalícia
              </div>
            </div>

            {/* Technical Details Accordion */}
            <div className="border-t border-border">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details" className="border-b border-border">
                  <AccordionTrigger className="font-mono text-xs uppercase tracking-widest py-6 hover:no-underline">Especificações Técnicas</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-light pb-6">
                    <ul className="space-y-2">
                      <li>Material: Ouro 18K Sólido</li>
                      <li>Gema: Diamante Certificado Livre de Conflitos</li>
                      <li>Peso: Aprox. 5g</li>
                      <li>Origem: Feito à mão na Itália</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping" className="border-b border-border">
                  <AccordionTrigger className="font-mono text-xs uppercase tracking-widest py-6 hover:no-underline">Envio e Devoluções</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-light pb-6">
                    Envio expresso gratuito para todo o mundo. Aceitamos devoluções em até 14 dias após a entrega, na condição original.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
