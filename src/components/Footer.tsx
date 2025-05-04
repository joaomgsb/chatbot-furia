import React from 'react';
import { Instagram, Twitter, Youtube, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-furia-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 mr-2">
                <img src="/images/furia.png" alt="FURIA Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-bold text-xl text-white">FURIA</span>
                <span className="font-bold text-xl ml-1">CS</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Experiência conversacional para os fãs do time de CS da FURIA.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/furiagg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-furia-yellow transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://x.com/FURIA" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com/furiagg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-gray-400 hover:text-furia-yellow transition-colors">Início</a></li>
              <li><a href="#sobre" className="text-gray-400 hover:text-furia-yellow transition-colors">Sobre</a></li>
              <li><a href="#chat" className="text-gray-400 hover:text-furia-yellow transition-colors">Chat</a></li>
              <li><a href="#time" className="text-gray-400 hover:text-furia-yellow transition-colors">Time</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Uberlândia, Brasil</li>
              <li>sac@furia.gg</li>
              <li><a href="https://furia.gg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">furia.gg</a></li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} FURIA Esports. Todos os direitos reservados.
          </p>
          <div className="flex">
            <a 
              href="#inicio" 
              className="bg-furia-gray hover:bg-white hover:text-furia-black p-2 rounded-full transition-colors"
              aria-label="Voltar ao topo"
            >
              <ChevronUp size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;