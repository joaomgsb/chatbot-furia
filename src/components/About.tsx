import React from 'react';
import { Trophy, Users, Calendar, GlobeIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const features = [
    {
      icon: <Trophy size={32} className="text-furia-yellow" />,
      title: "Conquistas",
      description: "A FURIA é uma das organizações de eSports mais premiadas do Brasil, com títulos em competições nacionais e internacionais."
    },
    {
      icon: <Users size={32} className="text-furia-yellow" />,
      title: "Jogadores de Elite",
      description: "Nosso time de CS conta com jogadores de alto nível que são referência na cena competitiva mundial."
    },
    {
      icon: <Calendar size={32} className="text-furia-yellow" />,
      title: "Fundação",
      description: "Fundada em 2017, a FURIA rapidamente se consolidou como uma potência nos eSports brasileiros e mundiais."
    },
    {
      icon: <GlobeIcon size={32} className="text-furia-yellow" />,
      title: "Presença Global",
      description: "Competimos nos principais torneios internacionais, levando a bandeira do Brasil para o mundo do Counter-Strike."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };

  return (
    <section id="sobre" className="section bg-furia-dark relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD100' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        }}
      />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="heading mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Sobre a <span className="text-furia-yellow">FURIA</span>
          </motion.h2>
          <motion.p 
            className="text-lg max-w-3xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A FURIA Esports é uma organização brasileira de esportes eletrônicos fundada em 2017, que se destacou mundialmente nas competições de Counter-Strike. Conheça mais sobre nossa história e conquistas.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-furia-gray p-6 rounded-lg shadow-lg transition-transform hover:transform hover:-translate-y-2"
              variants={itemVariants}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="subheading mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-20 p-8 bg-gradient-to-r from-furia-gray to-black rounded-lg shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8 md:w-1/3">
              <img src="/images/furia.png" alt="FURIA Logo" className="w-24 h-24 mx-auto md:mx-0 object-contain" />
            </div>
            <div className="md:w-2/3">
              <h3 className="subheading mb-4 text-furia-yellow">Nossa Missão</h3>
              <p className="text-gray-300 mb-4">
                A FURIA nasceu com a missão de elevar o esporte eletrônico brasileiro ao patamar de excelência mundial, unindo talentos excepcionais, trabalho árduo e uma paixão inabalável pelo jogo.
              </p>
              <p className="text-gray-300">
                Nosso objetivo é não apenas ganhar campeonatos, mas também inspirar a próxima geração de jogadores brasileiros a acreditarem que podem competir e vencer no cenário internacional.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;