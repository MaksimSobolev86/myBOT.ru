import React, { useState, useEffect, useRef } from 'react';
import { PlayIcon } from '../constants/icons';

const Demo: React.FC = () => {
  const fullText = "Посмотрите, как ваш новый администратор работает сам.";
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [videoPlaybackState, setVideoPlaybackState] = useState<'pending' | 'playing' | 'blocked' | 'paused'>('pending');
  const [isPosterBroken, setIsPosterBroken] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterSrc = "https://i.imgur.com/gfm62r8.png";

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

  // Effect for autoplay
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const attemptPlay = () => {
      videoElement.play()
        .catch(error => {
          console.info("Demo video autoplay was prevented by the browser:", error);
          setVideoPlaybackState('blocked');
        });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (videoPlaybackState === 'pending') {
            attemptPlay();
          }
        } else {
          videoElement.pause();
        }
      },
      {
        threshold: 0.5, 
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, [videoPlaybackState]);
  
  // Effect to listen for native play/pause events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setVideoPlaybackState('playing');
    const handlePause = () => {
      if (!video.ended && video.currentTime > 0) {
        setVideoPlaybackState('paused');
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const handleVideoContainerClick = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.paused) {
      video.play().catch(err => {
        console.error("Manual play failed:", err);
      });
    } else {
      video.pause();
    }
  };
  
  const showPlayButtonOverlay = videoPlaybackState === 'blocked' || videoPlaybackState === 'paused';

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
              <div 
                className="relative rounded-[2rem] overflow-hidden w-full h-full bg-black cursor-pointer"
                onClick={handleVideoContainerClick}
              >
                <video
                    ref={videoRef}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className={`w-full h-full object-cover transition-opacity duration-500 ${videoPlaybackState === 'playing' || videoPlaybackState === 'paused' ? 'opacity-100' : 'opacity-0'}`}
                    poster={isPosterBroken ? '' : posterSrc}
                >
                    <source src="https://allwebs.ru/images/2025/10/16/8d16f12614fcc9ee3d8c10fa87d9d485.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
                {videoPlaybackState === 'pending' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60" aria-label="Загрузка видео...">
                        <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}
                
                {showPlayButtonOverlay && (
                    <div className="absolute inset-0">
                        {videoPlaybackState === 'blocked' && !isPosterBroken && (
                           <img 
                                src={posterSrc} 
                                className="w-full h-full object-cover" 
                                alt="Превью демо-видео" 
                                onError={() => setIsPosterBroken(true)}
                           />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <div
                                className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white transition-all duration-300 transform hover:scale-110"
                                aria-label="Воспроизвести демо"
                            >
                                <PlayIcon className="h-12 w-12" />
                            </div>
                        </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Demo);