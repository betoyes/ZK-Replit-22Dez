import { useProducts } from '@/context/ProductContext';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Collections() {
  const { collections } = useProducts();

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 border-b border-border pb-8">
           <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-4">Coleções</h1>
           <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest max-w-md">
             Curadoria temática de peças atemporais.
           </p>
        </div>

        <div className="space-y-32">
          {collections.map((collection, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              key={collection.id} 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
            >
              <div className={`order-2 ${i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                 <div className="mb-6">
                   <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                     Coleção 0{i + 1}
                   </span>
                   <h2 className="font-display text-5xl md:text-6xl mb-6">{collection.name}</h2>
                   <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8 max-w-md">
                     {collection.description} Cada peça desta coleção foi desenhada para capturar a essência única de sua inspiração, combinando materiais nobres com design visionário.
                   </p>
                 </div>
                 
                 <Link href={`/shop?collection=${collection.id}`}>
                   <Button className="rounded-none h-14 px-8 bg-black text-white hover:bg-primary uppercase tracking-widest font-mono text-xs flex items-center gap-4 group">
                     Explorar Coleção <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                   </Button>
                 </Link>
              </div>
              
              <div className={`order-1 ${i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="aspect-[4/5] bg-secondary overflow-hidden relative group">
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
