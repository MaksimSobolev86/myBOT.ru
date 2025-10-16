
import React, { useEffect, useRef, useState } from 'react';

const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);
  
  return { count, ref };
};

const useInView = (ref: React.RefObject<HTMLElement>, options: IntersectionObserverInit = {}) => {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if(ref.current) {
         observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isInView;
};

const StatItem: React.FC<{ value: number; label: string }> = ({ value, label }) => {
    const { count, ref } = useCountUp(value, 2000);
    return (
        <div className="text-center">
            <span ref={ref} className="text-5xl font-extrabold text-primary">{count.toLocaleString('ru-RU')}+</span>
            <p className="text-lg text-gray-400 mt-2">{label}</p>
        </div>
    );
};


const Stats: React.FC = () => {
  return (
    <section className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <StatItem value={125000} label="Броней обработано" />
          <StatItem value={45000} label="Напоминаний отправлено" />
          <StatItem value={98} label="% довольных клиентов" />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Stats);