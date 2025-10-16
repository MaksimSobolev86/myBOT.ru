
import React from 'react';
import { LogoIcon } from '../constants/icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent text-gray-400">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <LogoIcon className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-white font-poiret-one">myBOT</span>
          </div>
          <div className="text-center">
            <p>Контакты: <a href="mailto:magnifico.digital@yandex.ru" className="text-gray-300 hover:text-primary transition">magnifico.digital@yandex.ru</a></p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} <span className="font-poiret-one">myBOT</span> — SaaS-система для бизнеса. Работает с 2024 года.</p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);