import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
      <div className="relative container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Попробуйте <span className="font-poiret-one">myBOT</span> — и забудьте о рутине
        </h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
          Ваш новый администратор готов к работе уже через пару дней.
        </p>
        <a href="https://t.me/Irala_bela_vita" target="_blank" rel="noopener noreferrer" className="inline-block text-white font-bold py-4 px-10 rounded-lg text-xl transition-all duration-300 transform btn-interactive">
          Подключить бесплатно
        </a>
        <p className="mt-6 text-sm text-gray-400">
          Telegram уже есть у ваших клиентов. Осталось только включить <span className="font-poiret-one">myBOT</span>.
        </p>
      </div>
    </section>
  );
};

export default React.memo(CTA);