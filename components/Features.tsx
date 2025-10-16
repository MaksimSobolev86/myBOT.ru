
import React from 'react';
import { AnalyticsIcon, BellIcon, BookingsIcon, DatabaseIcon, SecurityIcon, SendIcon } from '../constants/icons';

const features = [
  {
    icon: <BookingsIcon className="h-10 w-10 mb-4 text-primary" />,
    title: "Принимает брони 24/7",
    description: "Следит за временем и не допускает пересечений"
  },
  {
    icon: <BellIcon className="h-10 w-10 mb-4 text-primary" />,
    title: "Напоминает клиентам",
    description: "Уменьшает забытые брони до нуля"
  },
  {
    icon: <SendIcon className="h-10 w-10 mb-4 text-primary" />,
    title: "Отправляет акции и новости",
    description: "Растит повторные визиты"
  },
  {
    icon: <AnalyticsIcon className="h-10 w-10 mb-4 text-primary" />,
    title: "Ведёт аналитику",
    description: "Выручка, средний чек, активность по дням"
  },
  {
    icon: <DatabaseIcon className="h-10 w-10 mb-4 text-primary" />,
    title: "Ведёт базу клиентов",
    description: "Кто, когда, на сколько, с какими пожеланиями"
  },
  {
    icon: <SecurityIcon className="h-10 w-10 mb-4 text-primary" />,
    title: "Безопасно хранит данные",
    description: "Сервер под ключ, резервное копирование"
  }
];

const FeatureCard: React.FC<{ icon: React.ReactElement; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:backdrop-blur-sm hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
        {icon}
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight">Всё, что делает администратор — только быстрее</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            <span className="font-poiret-one">myBOT</span> автоматизирует рутину, чтобы вы могли сосредоточиться на главном.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Features);