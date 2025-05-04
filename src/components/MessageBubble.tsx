import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`${
          isBot 
            ? 'w-full sm:max-w-[80%] rounded-br-lg rounded-bl-none bg-furia-gray p-4' 
            : 'min-w-[80px] rounded-bl-lg rounded-br-none bg-white text-furia-black px-4 py-2.5'
        } rounded-t-lg shadow-md`}
        style={{ minWidth: isBot ? '0' : 'auto', maxWidth: isBot ? undefined : '60%' }}
      >
        {isBot && (
          <div className="flex items-center mb-2">
            <img src="/images/furia.png" alt="FURIA Logo" className="w-6 h-6 mr-2 object-contain" />
            <span className="font-semibold text-white">FURIA Bot</span>
          </div>
        )}
        <div 
          className={`${isBot ? 'text-gray-100' : 'text-gray-900 font-medium'} whitespace-pre-wrap break-words`}
          style={{ whiteSpace: 'pre-line' }}
          dangerouslySetInnerHTML={{ __html: message.content }}
        />
        <div
          className={`text-xs mt-1 ${
            isBot ? 'text-gray-400' : 'text-furia-black text-opacity-60'
          } text-right`}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;