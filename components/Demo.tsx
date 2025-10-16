import React, { useState, useEffect, useRef } from 'react';

const Demo: React.FC = () => {
  const fullText = "Посмотрите, как ваш новый администратор работает сам.";
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsTyping(true);
    setTypedText('');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0;
          const typingInterval = setInterval(() => {
            setTypedText(fullText.slice(0, i + 1));
            i++;
            if (i > fullText.length) {
              clearInterval(typingInterval);
              setTimeout(() => setIsTyping(false), 500);
            }
          }, 80);
          
          observer.disconnect(); // Animate only once
        }
      },
      { threshold: 0.6 }
    );

    const target = document.querySelector('#demo h2');
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const playPromise = videoElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error("Video autoplay was prevented by the browser:", error);
            });
          }
        } else {
          videoElement.pause();
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the video is visible
      }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="demo" className="py-20 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className={`text-4xl font-extrabold tracking-tight mb-6 h-32 lg:h-24 ${isTyping ? 'typing-cursor' : ''}`}>
              {typedText}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Всё просто — клиент пишет, бот всё делает. Без сложных инструкций и долгого обучения.
            </p>
            <a href="https://t.me/AISobolev_bot" target="_blank" rel="noopener noreferrer" className="inline-block text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 btn-interactive">
              Смотреть демо в Telegram
            </a>
          </div>

          <div className="lg:w-1/2 w-full max-w-sm mx-auto lg:mx-0">
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl">
              <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black">
                <video
                    ref={videoRef}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    poster="https://i.imgur.com/TUh5j1G.png"
                >
                    <source src="https://allwebs.ru/images/2025/10/14/20b8a54e3838e01fb8cc481ea279f0d7.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Demo);