import React, { useState, useEffect, useRef } from 'react';
import { LogoIcon } from '../constants/icons';

interface HeroProps {
  onVideoLoaded: () => void;
}

const VIDEO_SRC = "https://allwebs.ru/images/2025/10/16/e495101e91e7d50edae4803c9393c740.mp4";
const POSTER_SRC = "https://i.imgur.com/TUh5j1G.png";

const Hero: React.FC<HeroProps> = ({ onVideoLoaded }) => {
  const tagline = "личный администратор в кармане";
  const [typedTagline, setTypedTagline] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isAutoplaySuccessful, setIsAutoplaySuccessful] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isPosterBroken, setIsPosterBroken] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show and animate the content as soon as the component loads,
    // without waiting for the video.
    setIsContentVisible(true);
  }, []);

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

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Signal when video is ready to play to hide preloader
    const handleVideoReady = () => onVideoLoaded();

    if (videoElement.readyState >= 4) { // HAVE_ENOUGH_DATA
      handleVideoReady();
    } else {
      videoElement.addEventListener('canplaythrough', handleVideoReady, { once: true });
    }
    
    const attemptPlay = () => {
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsAutoplaySuccessful(true);
          })
          .catch(error => {
            console.info("Hero video autoplay was prevented:", error);
            setIsAutoplaySuccessful(false);
          });
      }
    };
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          videoElement.pause();
        }
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, [onVideoLoaded]);

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
       {/* Poster is always visible underneath, but hidden if it fails to load */}
       {!isPosterBroken && (
        <img 
            src={POSTER_SRC} 
            className="absolute top-0 left-0 w-full h-full object-cover z-0" 
            alt="" 
            aria-hidden="true" 
            onError={() => setIsPosterBroken(true)}
        />
       )}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${isAutoplaySuccessful ? 'opacity-100' : 'opacity-0'}`}
        poster={isPosterBroken ? '' : POSTER_SRC} // Don't use broken poster
        src={VIDEO_SRC}
      >
        Your browser does not support the video tag.
      </video>
      <div className={`absolute top-0 left-0 w-full h-full bg-gray-900/75 z-[1] transition-opacity duration-1000 ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}></div>

      <div className={`relative z-10 px-4 transition-all duration-1000 ease-out ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-2 flex items-center justify-center flex-wrap">
          <LogoIcon className="inline-block h-[1em] w-auto text-primary align-middle" />
          <span className="mx-3 md:mx-4">—</span>
          <span className="font-bold">твой</span>
        </h1>
        <h2 className={`text-2xl sm:text-3xl md:text-5xl text-gray-200 font-medium mb-8 h-12 md:h-16 ${isTyping ? 'typing-cursor' : ''}`}>
          {typedTagline}
        </h2>
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 mb-8">
          Брони, уведомления и аналитика — прямо в Telegram.
          <br />
          Работает 24/7. Без ошибок. Без лишних слов.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://t.me/Irala_bela_vita" target="_blank" rel="noopener noreferrer" className="text-white font-bold py-3 px-8 rounded-lg text-base sm:text-lg transition-all duration-300 btn-interactive">
            Попробовать бесплатно
          </a>
          <a href="https://t.me/AISobolev_bot" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-lg text-base sm:text-lg hover:bg-white/20 transition-all duration-300">
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