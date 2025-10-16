import React, { useState } from 'react';
import { SendIcon } from '../constants/icons';

const Spinner: React.FC = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// The Web3Forms Access Key is now configured.
const WEB3FORMS_ACCESS_KEY = "2b02b504-f4bc-461b-aa2f-79b1b4603f24";

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const baseInputClasses = "block w-full rounded-lg border-2 bg-gray-800/50 px-4 py-3 text-white placeholder:text-gray-500 transition-colors duration-300 focus:border-primary focus:outline-none focus:ring-0 border-gray-700 disabled:opacity-50";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    setStatus('sending');
    setErrorMessage('');

    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());

    const json = JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "Новая заявка с сайта myBOT",
      ...formObject,
    });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        (event.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Не удалось связаться с сервером. Проверьте ваше интернет-соединение.');
    }
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-20 sm:py-24">
        <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto bg-gray-900/50 rounded-2xl p-8 md:p-12 shadow-2xl border border-primary">
                <h2 className="text-3xl font-bold text-primary mb-4">Спасибо!</h2>
                <p className="text-lg text-gray-300">Ваша заявка отправлена. Мы скоро свяжемся с вами.</p>
            </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold tracking-tight">Готовы начать?</h2>
          <p className="mt-4 text-lg text-gray-400">Оставьте заявку, и мы свяжемся с вами, чтобы обсудить, как myBOT может помочь вашему бизнесу.</p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="relative max-w-2xl mx-auto bg-gray-900/50 rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-700"
        >
          <fieldset>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <input type="text" name="Имя" id="name" required placeholder="ФИО *" className={baseInputClasses} aria-label="ФИО" aria-required="true" />
              </div>
              <div>
                <input type="tel" name="Телефон" id="phone" required placeholder="Телефон *" className={baseInputClasses} aria-label="Телефон" aria-required="true" />
              </div>
              <div>
                <input type="text" name="Компания" id="company" placeholder="Название компании" className={baseInputClasses} aria-label="Название компании" />
              </div>
              <div>
                <input type="text" name="Telegram" id="telegram" required placeholder="Telegram *" className={baseInputClasses} aria-label="Telegram" aria-required="true" />
              </div>
            </div>
            <div className="mb-8">
              <textarea name="Пожелания" id="wishes" rows={4} placeholder="Личные пожелания" className={`${baseInputClasses} resize-none`} aria-label="Личные пожелания"></textarea>
            </div>
            <div className="text-center">
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 w-full md:w-auto btn-interactive disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <Spinner />
                    Отправка...
                  </>
                ) : (
                  <>
                    Отправить <SendIcon className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
              {status === 'error' && (
                <p className="mt-4 text-red-500">{errorMessage}</p>
              )}
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default React.memo(ContactForm);