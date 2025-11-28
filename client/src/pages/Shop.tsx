import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { products, categories } from '@/lib/mockData';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Shop() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-background pt-32">
      
      <div className="container mx-auto px-6 md:px-12 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-border pb-8">
          <div>
             <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-4">Arquivo</h1>
             <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest max-w-md">
               Seleção curada de artefatos para o indivíduo moderno.
             </p>
          </div>
          <div className="font-mono text-xs mb-2">
            {filteredProducts.length} ITENS
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Minimal Sidebar Filters */}
          <div className="w-full lg:w-48 space-y-12 sticky top-32 h-fit">
            {/* Categories */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest mb-6 text-muted-foreground">Filtrar Por</h3>
              <div className="space-y-4">
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className={`block font-display text-lg hover:text-muted-foreground transition-colors ${selectedCategory === 'all' ? 'text-foreground underline decoration-1 underline-offset-4' : 'text-muted-foreground'}`}
                >
                  Todos
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`block font-display text-lg hover:text-muted-foreground transition-colors capitalize ${selectedCategory === cat.id ? 'text-foreground underline decoration-1 underline-offset-4' : 'text-muted-foreground'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter - Minimal */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest mb-6 text-muted-foreground">Faixa de Preço</h3>
              <div className="space-y-6">
                <Slider 
                  defaultValue={[0, 50000]} 
                  max={50000} 
                  step={1000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
                <div className="flex justify-between font-mono text-xs">
                  <span>0</span>
                  <span>50k+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modern Masonry Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center border-t border-b border-border">
                <p className="font-display text-2xl mb-4">Nenhum artefato encontrado.</p>
                <Button variant="link" onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 50000]);
                }} className="font-mono text-xs uppercase tracking-widest">
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={product.id} 
                    className="group cursor-pointer"
                  >
                    <Link href={`/product/${product.id}`}>
                      <div className="relative aspect-[3/4] bg-secondary overflow-hidden mb-6">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        
                        {/* Hover Overlay Button */}
                        <div className="absolute bottom-0 left-0 w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 px-4 flex justify-between items-center">
                             <span className="font-mono text-xs uppercase tracking-widest">Ver Detalhes</span>
                             <ArrowRight className="h-3 w-3" />
                           </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-display text-xl leading-none mb-2 group-hover:underline underline-offset-4 decoration-1">{product.name}</h3>
                          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{product.collection}</span>
                        </div>
                        <p className="font-mono text-sm">R$ {product.price.toLocaleString('pt-BR')}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
