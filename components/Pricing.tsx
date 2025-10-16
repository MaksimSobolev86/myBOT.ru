import React from 'react';
import { CheckCircleIcon } from '../constants/icons';

const featuresIncluded = [
  "Поддержка и обновления",
  "Сервер и хостинг",
  "Консультации и оптимизация",
  "Готовый Telegram-интерфейс под ваш бренд"
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold tracking-tight">Подключение за пару дней — и всё работает</h2>
          <p className="mt-4 text-lg text-gray-400">Прозрачные цены без скрытых платежей. Вы платите за результат.</p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-gray-900/50 rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-800/50 border border-white/10 p-6 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-gray-400">💼 Подключение</h3>
                    <p className="text-3xl sm:text-4xl font-bold my-2"><del className="text-xl sm:text-2xl text-red-500/70">5000 ₽</del> → Бесплатно</p>
                    <p className="text-primary font-bold">до конца зимы</p>
                </div>
                 <div className="bg-gray-800/50 border border-white/10 p-6 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-gray-400">💸 Ежемесячный платеж</h3>
                    <p className="text-3xl sm:text-4xl font-bold my-2"><del className="text-xl sm:text-2xl text-red-500/70">1400 ₽</del> → 990 ₽</p>
                    <p className="text-primary font-bold">/ месяц</p>
                </div>
            </div>

            <div className="border-t border-gray-700 pt-8">
                <h4 className="text-xl font-bold text-center mb-6">Включено в ежемесячный платеж:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {featuresIncluded.map((feature, i) => (
                        <li key={i} className="flex items-center">
                            <CheckCircleIcon className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="text-center mt-10">
                <a href="https://t.me/Irala_bela_vita" target="_blank" rel="noopener noreferrer" className="inline-block text-white font-bold py-4 px-10 rounded-lg text-xl transition-all duration-300 btn-interactive">
                  🚀 Подключить бесплатно
                </a>
            </div>
        </div>

      </div>
    </section>
  );
};

export default React.memo(Pricing);