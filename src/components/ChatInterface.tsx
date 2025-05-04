import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import MessageBubble from './MessageBubble';
import { useChat } from '../hooks/useChat';

const ChatInterface: React.FC = () => {
  const { messages, inputValue, setInputValue, sendMessage, isTyping, greetUser } = useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Efeito para fazer scroll quando novas mensagens chegarem
  useEffect(() => {
    if (chatContainerRef.current && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      // Só faz scroll se for mensagem do bot
      if (lastMessage.sender === 'bot') {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
    }
  };
  
  return (
    <section id="chat" className="section bg-furia-black">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2 
            className="heading mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Converse com a <span className="text-furia-yellow">FURIA</span>
          </motion.h2>
          <motion.p 
            className="text-lg max-w-3xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Tire suas dúvidas sobre o time de CS da FURIA, jogadores, competições e muito mais!
          </motion.p>
        </div>
        
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => {
            setTimeout(() => greetUser(), 1000);
          }}
        >
          <div className="bg-furia-gray rounded-lg shadow-xl overflow-hidden">
            <div className="bg-furia-black p-4 border-b border-gray-800 flex items-center">
              <div className="w-8 h-8 mr-3">
                <img src="/images/furia.png" alt="FURIA Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-white">FURIA Chat</h3>
                <p className="text-xs text-gray-400">Conectado</p>
              </div>
            </div>
            
            <div ref={chatContainerRef} className="p-4 h-[32rem] md:h-[40rem] overflow-y-auto bg-gradient-to-b from-furia-dark to-furia-black">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[80%] rounded-t-lg rounded-br-lg bg-furia-gray p-4 shadow-md">
                    <div className="flex items-center">
                      <div className="w-6 h-6 mr-2">
                        <img src="/images/furia.png" alt="FURIA Logo" className="w-full h-full object-contain" />
                      </div>
                      <span className="font-semibold text-white">FURIA Bot</span>
                    </div>
                    <div className="flex space-x-1 mt-2">
                      <motion.div 
                        className="w-2 h-2 bg-white rounded-full" 
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-white rounded-full" 
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-white rounded-full" 
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop", delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 bg-furia-dark">
              <div className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-furia-gray text-white border border-gray-700 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-furia-yellow"
                  placeholder="Digite sua mensagem..."
                />
                <button
                  type="submit"
                  className="bg-furia-yellow text-white px-4 py-2 rounded-r-lg flex items-center justify-center transition-colors hover:bg-opacity-80 focus:outline-none"
                  disabled={isTyping}
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Pergunte sobre jogadores, mapas, competições, e mais!
              </div>
            </form>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Este é um protótipo demonstrativo com mensagens pré-programadas. As respostas são simuladas e não representam necessariamente informações oficiais da FURIA.
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default ChatInterface;
