import { motion } from 'framer-motion';
import { useProducts } from '@/context/ProductContext';

export default function Manifesto() {
  const { branding } = useProducts();

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1600&q=80" 
            alt="Manifesto"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-xs uppercase tracking-[0.3em] mb-6 text-white/70"
          >
            Nossa Filosofia
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
          >
            {branding.manifestoTitle || 'Manifesto'}
          </motion.h1>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
                {branding.manifestoText}
              </p>

              <div className="w-24 h-px bg-border" />

              <div className="grid md:grid-cols-2 gap-12 text-lg leading-relaxed text-muted-foreground">
                <div className="space-y-6">
                  <p>
                    Nascemos da convicção de que o luxo verdadeiro não precisa gritar. Ele sussurra. 
                    Ele se revela nos detalhes imperceptíveis, nas proporções perfeitas, no peso 
                    exato de uma peça bem construída.
                  </p>
                  <p>
                    Cada joia que criamos é uma declaração silenciosa. Uma recusa ao óbvio, 
                    ao excessivo, ao descartável. Preferimos a permanência à tendência, 
                    a substância ao espetáculo.
                  </p>
                </div>
                <div className="space-y-6">
                  <p>
                    Trabalhamos com materiais de origem ética e rastreável. Nosso ouro é reciclado, 
                    nossos diamantes são certificados, nossa produção é consciente. Acreditamos que 
                    a beleza não pode existir às custas do mundo.
                  </p>
                  <p>
                    Para nós, uma joia não é apenas um objeto. É um artefato de memória, 
                    um marco de momentos, uma herança que atravessa gerações. Por isso, 
                    construímos para durar. Para significar. Para transcender.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto text-center"
          >
            <p className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
              "{branding.impactPhrase || 'A perfeição não é um detalhe. É a única opção.'}"
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Nossos Princípios
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">01</div>
                  <h3 className="font-display text-xl font-semibold">Excelência Silenciosa</h3>
                  <p className="text-muted-foreground">
                    A qualidade fala por si. Não precisamos de logos ostensivos ou marketing agressivo. 
                    Nosso trabalho é nossa assinatura.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">02</div>
                  <h3 className="font-display text-xl font-semibold">Responsabilidade Total</h3>
                  <p className="text-muted-foreground">
                    Da origem do material ao destino final, assumimos responsabilidade por cada etapa. 
                    Ética não é opcional.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">03</div>
                  <h3 className="font-display text-xl font-semibold">Atemporalidade</h3>
                  <p className="text-muted-foreground">
                    Criamos para gerações, não para temporadas. Cada peça é desenhada para ser tão 
                    relevante daqui a 50 anos quanto é hoje.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
