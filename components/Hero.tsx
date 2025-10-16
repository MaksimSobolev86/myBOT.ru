import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const tagline = "личный администратор в кармане";
  const [typedTagline, setTypedTagline] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setIsTyping(true);
    setTypedTagline('');

    const startTyping = () => {
      let i = 0;
      const interval = setInterval(() => {
        setTypedTagline(tagline.slice(0, i + 1));
        i++;
        if (i > tagline.length) {
          clearInterval(interval);
          setTimeout(() => setIsTyping(false), 500); 
        }
      }, 100);
      return () => clearInterval(interval);
    };

    const timeoutId = setTimeout(startTyping, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        poster="https://allwebs.ru/images/2025/10/14/7501624469dca1940fb2a3b887891151.mp4"
      >
        <source src="https://allwebs.ru/images/2025/10/14/7501624469dca1940fb2a3b887891151.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900/75 z-[1]"></div>
      <div className="relative z-10 px-4 animate-[fadeInUp_1s_ease-out]">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-2">
          <span className="font-poiret-one text-primary">myBOT</span> — твой
        </h1>
        <h2 className={`text-3xl md:text-5xl text-gray-200 font-medium mb-8 h-12 md:h-16 ${isTyping ? 'typing-cursor' : ''}`}>
          {typedTagline}
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
          Брони, уведомления и аналитика — прямо в Telegram.
          <br />
          Работает 24/7. Без ошибок. Без лишних слов.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://t.me/Irala_bela_vita" target="_blank" rel="noopener noreferrer" className="text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 btn-interactive">
            Попробовать бесплатно
          </a>
          <a href="https://t.me/AISobolev_bot" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white/20 transition-all duration-300">
            Посмотреть демо
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-400">
          Подключение за пару дней. Без установки. Всё работает в Telegram.
        </p>
      </div>
    </section>
  );
};

export default React.memo(Hero);