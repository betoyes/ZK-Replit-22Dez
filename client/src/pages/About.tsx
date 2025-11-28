import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-5xl mb-8">Nossa História</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12 font-light">
            Fundada em 1985, a ZK REZK nasceu do desejo de criar joias que não fossem apenas acessórios, mas extensões da personalidade de quem as usa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 text-left">
          <div>
            <h3 className="font-serif text-2xl mb-4">Artesanato</h3>
            <p className="text-muted-foreground">
              Cada peça é esculpida à mão por mestres ourives que dedicam décadas ao aperfeiçoamento de sua arte. Utilizamos apenas ouro certificado e gemas de origem ética.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl mb-4">Sustentabilidade</h3>
            <p className="text-muted-foreground">
              Comprometidos com o futuro, garantimos que 100% de nossos materiais provêm de fontes responsáveis, respeitando tanto o meio ambiente quanto as comunidades mineradoras.
            </p>
          </div>
        </div>

        <div className="aspect-video bg-secondary/20 w-full mb-12 flex items-center justify-center">
          <span className="font-serif text-lg italic text-muted-foreground">Imagem do Atelier</span>
        </div>
      </div>
    </div>
  );
}
