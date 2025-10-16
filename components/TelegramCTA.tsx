import React from 'react';
import { SendIcon } from '../constants/icons';

const TelegramCTA: React.FC = () => {
  return (
    <a
      href="https://t.me/biznesclub_expert"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 group"
      aria-label="Присоединяйся в наш канал в Telegram"
    >
      <SendIcon className="h-6 w-6 transform transition-transform group-hover:rotate-12" />
      <span className="hidden sm:inline">Присоединяйся в наш канал</span>
    </a>
  );
};

export default React.memo(TelegramCTA);