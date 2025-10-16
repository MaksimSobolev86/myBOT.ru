
import React from 'react';

const testimonials = [
  { quote: "Окупаемость — неделя. Всё работает само!", author: "Ксения, “Лето Парк”" },
  { quote: "Выручка +18%. Реклама прямо в Telegram.", author: "Олег, “Речная база”" },
  { quote: "Теперь клиенты не забывают про брони. Удобно!", author: "Мария, “Аура”" },
  { quote: "Телеграм у всех — не надо ничего устанавливать.", author: "Вадим, “Зелёный Берег”" },
  { quote: "Сэкономили 45 000 в месяц на администраторе.", author: "Андрей, “Шашлык Пати”" },
  { quote: "Простой и понятный интерфейс, разобрались за 5 минут.", author: "Елена, “Beauty Spot”"},
  { quote: "Аналитика помогает понять, какие услуги популярнее.", author: "Иван, “ProRent”"},
  { quote: "Поддержка отвечает моментально, помогли с настройкой.", author: "София, “Квест-Хаус”"}
];

const TestimonialCard: React.FC<{ quote: string; author: string }> = ({ quote, author }) => (
    <div className="flex-shrink-0 w-80 bg-gray-800/50 border border-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg mx-4 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:shadow-primary/20">
        <p className="text-lg italic text-gray-300">«{quote}»</p>
        <p className="text-right font-bold mt-4 text-primary">— {author}</p>
    </div>
);

const Testimonials: React.FC = () => {
    const extendedTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="py-20 sm:py-24">
            <div className="container mx-auto px-6 text-center mb-12">
              <h2 className="text-4xl font-extrabold tracking-tight">Нам доверяют десятки компаний</h2>
            </div>
            <div className="w-full overflow-hidden relative">
                <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
                <div className="flex animate-infinite-scroll hover:[animation-play-state:paused]">
                    {extendedTestimonials.map((testimonial, i) => (
                        <TestimonialCard key={i} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Testimonials);