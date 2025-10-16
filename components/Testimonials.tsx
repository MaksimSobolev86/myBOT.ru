
import React, { useEffect, useRef } from 'react';

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
    <div className="flex-shrink-0 w-80 bg-gray-800 border border-white/10 p-6 rounded-lg">
        <p className="text-lg italic text-gray-300">«{quote}»</p>
        <p className="text-right font-bold mt-4 text-primary">— {author}</p>
    </div>
);

const Testimonials: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<number | null>(null);
    const restartTimeoutRef = useRef<number | null>(null);

    // Duplicate testimonials for a seamless loop
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    const startAutoScroll = () => {
        if (intervalRef.current) return; // Prevent multiple intervals

        intervalRef.current = window.setInterval(() => {
            const el = scrollContainerRef.current;
            if (el) {
                // When the scroll position is near the end of the first half, reset to the beginning
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft = 0;
                } else {
                    el.scrollLeft += 1;
                }
            }
        }, 30); // Adjust for speed, lower is faster
    };

    const stopAutoScroll = () => {
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };
    
    const handleUserInteraction = () => {
        stopAutoScroll();
        if (restartTimeoutRef.current) {
            window.clearTimeout(restartTimeoutRef.current);
        }
        restartTimeoutRef.current = window.setTimeout(() => {
            startAutoScroll();
        }, 5000); // Restart after 5 seconds of inactivity
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        
        // Use an observer to start/stop scrolling when the component is in/out of view
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startAutoScroll();
                } else {
                    stopAutoScroll();
                }
            },
            { threshold: 0.1 }
        );

        if (container) {
            observer.observe(container);
            container.addEventListener('pointerdown', handleUserInteraction);
            container.addEventListener('wheel', handleUserInteraction, { passive: true });
        }

        return () => {
            stopAutoScroll();
            if (restartTimeoutRef.current) {
                window.clearTimeout(restartTimeoutRef.current);
            }
            if (container) {
                observer.unobserve(container);
                container.removeEventListener('pointerdown', handleUserInteraction);
                container.removeEventListener('wheel', handleUserInteraction);
            }
        };
    }, []);

    return (
        <section className="py-20 sm:py-24">
            <div className="container mx-auto px-6 text-center mb-12">
              <h2 className="text-4xl font-extrabold tracking-tight">Нам доверяют десятки компаний</h2>
            </div>
            <div 
              className="w-full overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
              }}
            >
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto py-4 no-scrollbar pl-6 pr-6 cursor-grab active:cursor-grabbing"
                    style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
                >
                    <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                    {duplicatedTestimonials.map((testimonial, i) => (
                        <TestimonialCard key={i} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Testimonials);
