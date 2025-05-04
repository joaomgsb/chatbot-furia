import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter } from 'lucide-react';

interface Player {
  name: string;
  role: string;
  nickname: string;
  image: string;
  instagram?: string;
  twitter?: string;
}

const Team: React.FC = () => {
  const menTeam = [
    {
      name: "KSCERATO",
      role: "Rifler",
      nickname: "Andrey Oliveira",
      image: "/images/kscerato.png", 
      instagram: "https://www.instagram.com/kscerato/",
      twitter: "https://twitter.com/kscerato"
    },
    {
      name: "yuurih",
      role: "Entry Fragger",
      nickname: "Yuri Santos",
      image: "/images/yuurih.png",
      instagram: "https://www.instagram.com/yuurihfps",
      twitter: "https://x.com/yuurih"
    },
    {
      name: "Fallen",
      role: "Rifler/IGL",
      nickname: "Gabriel Toledo",
      image: "/images/fallen.png",
      instagram: "https://www.instagram.com/fallen",
      twitter: "https://twitter.com/FalleNCS"
    },
    {
      name: "yekindar",
      role: "Support",
      nickname: "Mareks Gaļinskis",
      image: "/images/yekindar.png",
      instagram: "https://www.instagram.com/yek1ndar/",
      twitter: "https://twitter.com/yek1ndar"
    },
    {
      name: "MOLODOY",
      role: "Awper",
      nickname: "Danil Golubenko",
      image: "/images/molodoy.png",
      instagram: "https://www.instagram.com/danil.molodoy_/",
      twitter: "https://x.com/tvoy_molodoy"
    }
  ];

  const womenTeam = [
    {
      name: "kaahSENSEI",
      role: "Awper",
      nickname: "Karina Takahashi",
      image: "/images/feminino/kaah.png",
      instagram: "https://www.instagram.com/kaahtak",
      twitter: "https://x.com/kaahtak"
    },
    {
      name: "izaa",
      role: "IGL",
      nickname: "Izabella Galle",
      image: "/images/feminino/izaa.png",
      instagram: "https://www.instagram.com/izaa_galle",
      twitter: "https://x.com/izaa_galle"
    },
    {
      name: "gabs",
      role: "Suporte/Rifler",
      nickname: "Gabriela Freindorfer",
      image: "/images/feminino/gabs.png",
      instagram: "https://instagram.com/gabsfreindorfer",
      twitter: "https://x.com/gabsfreindorfer"
    },
    {
      name: "bizinha",
      role: "Rifler",
      nickname: "Bruna Marvila",
      image: "/images/feminino/bizinha.png",
      instagram: "https://www.instagram.com/bizinhafps",
      twitter: "https://x.com/bizinhafps"
    },
    {
      name: "lulitenz",
      role: "Entry Fragger",
      nickname: "Lucia Dubra",
      image: "/images/feminino/lulitenz.png",
      instagram: "https://www.instagram.com/ludubra",
      twitter: "https://x.com/LuDubra"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
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
    <section id="time" className="section bg-gradient-to-b from-furia-black to-furia-dark">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            className="heading mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Nosso <span className="text-furia-yellow">Time</span>
          </motion.h2>
        </div>
        
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold mb-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Time Masculino
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {menTeam.map((player, index) => (
              <PlayerCard key={index} player={player} variants={itemVariants} />
            ))}
          </motion.div>
        </div>
        
        <div>
          <motion.h3
            className="text-2xl font-bold mb-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Time Feminino
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {womenTeam.map((player, index) => (
              <PlayerCard key={index} player={player} variants={itemVariants} />
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a 
            href="#chat" 
            className="btn btn-primary inline-flex"
          >
            Converse com nosso Bot
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface PlayerCardProps {
  player: Player;
  variants: any;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, variants }) => {
  return (
    <motion.div 
      className="group"
      variants={variants}
    >
      <div className="relative overflow-hidden rounded-t-lg angular-border bg-furia-gray">
        <img 
          src={player.image} 
          alt={`${player.name} - FURIA CS`} 
          className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-xl font-bold text-furia-yellow">{player.name}</h3>
          <p className="text-furia-white">{player.role}</p>
        </div>
        <div className="absolute top-0 right-0 bg-furia-yellow text-black font-bold px-3 py-1 m-4">
          FURIA
        </div>
      </div>
      <div className="bg-furia-gray p-4 rounded-b-lg">
        <p className="text-gray-400 mb-3">{player.nickname}</p>
        <div className="flex justify-center space-x-4">
          {player.instagram && (
            <a 
              href={player.instagram}
              target="_blank"
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
          )}
          {player.twitter && (
            <a 
              href={player.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Team;