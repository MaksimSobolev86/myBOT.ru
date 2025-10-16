import React, { useEffect } from 'react';
import { CloseIcon, PhoneIcon, TelegramIcon, MailIcon } from '../constants/icons';

const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-[fade-in_0.3s_ease-out]"
      aria-labelledby="contact-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md m-4 bg-gray-900/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8 transform transition-all duration-300 animate-[scale-in_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Закрыть модальное окно"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
        <h2 id="contact-modal-title" className="text-2xl font-bold text-center mb-6 font-poiret-one text-white">
          Наши контакты
        </h2>
        <ul className="space-y-4 text-lg">
          <li className="flex items-center gap-4">
            <PhoneIcon className="h-6 w-6 text-primary flex-shrink-0" />
            <a href="tel:+79125909026" className="text-gray-300 hover:text-white transition-colors">+7 (912) 590-90-26</a>
          </li>
          <li className="flex items-center gap-4">
            <TelegramIcon className="h-6 w-6 text-primary flex-shrink-0" />
            <a href="https://t.me/Irala_bela_vita" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">@Irala_bela_vita</a>
          </li>
          <li className="flex items-center gap-4">
            <MailIcon className="h-6 w-6 text-primary flex-shrink-0" />
            <a href="mailto:magnifico.digital@yandex.ru" className="text-gray-300 hover:text-white transition-colors">magnifico.digital@yandex.ru</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(ContactModal);