import { useState, useEffect } from 'react';
import Head from 'next/head';
import { SurveyForm } from '../components/SurveyForm';
import { LocaleSwitcher } from '../components/LocaleSwitcher';
import { ThemeToggle } from '../components/ThemeToggle';
import { Locale, DEFAULT_LOCALE, t, formatMessage } from '../lib/i18n';

// Декоративный элемент фона
const Decoration = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none opacity-30 dark:opacity-40 blur-2xl animate-float ${className}`}>
    <div className="w-56 h-56 rounded-full bg-gradient-to-r from-accent via-purple-400 to-primary dark:from-accent/70 dark:to-primary/70" />
  </div>
);

export default function Home() {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  
  // Эффект для инициализации локали из localStorage при загрузке страницы
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale === 'ru' || savedLocale === 'en') {
      console.log('Home: Loading saved locale from localStorage:', savedLocale);
      setLocale(savedLocale as Locale);
    } else {
      console.log('Home: Using default locale:', DEFAULT_LOCALE);
    }
  }, []);
  
  // Обработчик изменения локали от переключателя
  const handleLocaleChange = (newLocale: Locale) => {
    console.log('Home: Locale changed to:', newLocale);
    setLocale(newLocale);
  };
  
  // Функция для отображения года в футере
  const currentYear = new Date().getFullYear();

  console.log('Home: Rendering with locale:', locale);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background overflow-hidden relative">
      {/* Декоративные элементы фона */}
      <Decoration className="top-0 right-0 translate-x-1/3 -translate-y-1/3" />
      <Decoration className="bottom-0 left-0 -translate-x-1/3 translate-y-1/3" />
      <Decoration className="top-1/2 left-1/4 -translate-y-1/2 scale-75" />
      
      <div className="relative z-10"> {/* Обернем содержимое, чтобы оно было над декоративными элементами */}
        <Head>
          <title>{t('app.title', 'Опрос про парфюмерное устройство RNBW', locale)}</title>
          <meta name="description" content={t('app.description', 'Благодарим, что решили помочь нам! Ваши ответы на эти вопросы помогут нам создать устройство мечты 🌈', locale)} />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>

        <LocaleSwitcher onChange={handleLocaleChange} />
        <ThemeToggle />
        
        <main className="container max-w-3xl px-4 py-10 md:py-16 mx-auto">
          <div className="space-y-6 mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fadeIn">
              {t('app.title', 'Опрос про парфюмерное устройство RNBW', locale)}
            </h1>
            <p className="text-center text-muted-foreground max-w-xl mx-auto animate-fadeIn" style={{animationDelay: '100ms'}}>
              {t('app.description', 'Благодарим, что решили помочь нам! Ваши ответы на эти вопросы помогут нам создать устройство мечты 🌈', locale)}
            </p>
          </div>
          
          <div className="bg-card dark:bg-card/40 shadow-md dark:shadow-primary/5 backdrop-blur-sm rounded-xl p-6 md:p-10 animate-scaleIn relative overflow-hidden group" style={{animationDelay: '200ms'}}>
            {/* Светящаяся граница при наведении */}
            <div className="absolute inset-0 border border-transparent group-hover:border-accent/30 rounded-xl transition-colors duration-500"></div>
            
            {/* Светящийся эффект при наведении */}
            <div className="absolute -inset-px bg-gradient-to-r from-primary/20 via-accent/10 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
            
            <div className="relative">
              <SurveyForm locale={locale} />
            </div>
          </div>
          
          <footer className="mt-12 text-center text-sm text-muted-foreground animate-fadeIn" style={{animationDelay: '300ms'}}>
            {formatMessage(t('footer.copyright', '© {year} RNBW. Все права защищены.', locale), { year: currentYear })}
          </footer>
        </main>
      </div>
    </div>
  );
} 