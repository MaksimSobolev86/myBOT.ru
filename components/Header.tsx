import React, { useState } from 'react';
import { LogoIcon, MenuIcon, CloseIcon } from '../constants/icons';

interface HeaderProps {
  onContactClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleContactClick = () => {
    onContactClick();
    setIsMobileMenuOpen(false); // Close mobile menu when contact modal opens
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LogoIcon className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight font-poiret-one">myBOT</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={onContactClick}
              className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
            >
              Контакты
            </button>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">
              Заполнить форму
            </a>
            <a href="https://t.me/Irala_bela_vita" target="_blank" rel="noopener noreferrer" className="text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 btn-interactive">
              Попробовать бесплатно
            </a>
          </div>
          
          {/* Mobile Burger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Открыть меню"
            >
              <MenuIcon className="h-7 w-7" />
            </button>
          </div>

        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-gray-900/90 backdrop-blur-xl md:hidden animate-[fade-in_0.3s_ease-out]">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center h-[81px] border-b border-white/10">
            <div className="flex items-center gap-3">
              <LogoIcon className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight font-poiret-one">myBOT</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Закрыть меню"
            >
              <CloseIcon className="h-7 w-7" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-[calc(100%-81px)]">
            <nav className="flex flex-col gap-10 text-center">
              <button
                onClick={handleContactClick}
                className="text-3xl font-semibold text-gray-200 hover:text-primary transition-colors"
              >
                Контакты
              </button>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-semibold text-gray-200 hover:text-primary transition-colors"
              >
                Заполнить форму
              </a>
              <a 
                href="https://t.me/Irala_bela_vita"
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-6 text-white font-bold py-4 px-10 rounded-lg text-xl transition-all duration-300 btn-interactive"
              >
                Попробовать бесплатно
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Header);