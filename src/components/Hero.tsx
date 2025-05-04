import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section 
      id="inicio"
      className="relative min-h-screen flex items-center bg-furia-black overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(/images/wallpaper.jpg)' }}
    >
      <div className="absolute inset-0 bg-furia-black opacity-50 md:opacity-30"></div>
      
      <div className="container-custom relative z-10 pt-20">
        <div className="grid grid-cols-1 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h5 className="text-furia-yellow font-semibold mb-2">#DIADEFURIA</h5>
            <h1 className="heading mb-6">
              Converse com a <span className="text-furia-yellow">FURIA</span> e fique por dentro do universo CS
            </h1>
            <p className="text-lg mb-8 text-gray-300">
              Interaja com nosso chat e descubra tudo sobre seu time favorito, partidas, jogadores e eventos. A FURIA te espera!
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#chat" className="btn btn-primary">
                Iniciar Chat
              </a>
              <a href="#sobre" className="btn btn-outline">
                Saiba Mais
              </a>
            </div>
          </motion.div>
        </div>
      </div> 
    </section>
  );
};

export default Hero;