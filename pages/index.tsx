import { useState, useEffect } from 'react';
import Head from 'next/head';
import { SurveyForm } from '../components/SurveyForm';
import { LocaleSwitcher } from '../components/LocaleSwitcher';
import { Locale, DEFAULT_LOCALE, t, formatMessage } from '../lib/i18n';

export default function Home() {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  
  // Эффект для инициализации локали из localStorage при загрузке страницы
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale === 'ru' || savedLocale === 'en') {
      setLocale(savedLocale as Locale);
    }
  }, []);
  
  // Функция для отображения года в футере
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background">
      <Head>
        <title>{t('app.title', 'Опрос про парфюмерное устройство RNBW', locale)}</title>
        <meta name="description" content={t('app.description', 'Благодарим, что решили помочь нам! Ваши ответы на эти вопросы помогут нам создать устройство мечты 🌈', locale)} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <LocaleSwitcher onChange={setLocale} />
      
      <main className="container max-w-3xl px-4 py-10 md:py-16 mx-auto">
        <div className="space-y-6 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fadeIn">
            {t('app.title', 'Опрос про парфюмерное устройство RNBW', locale)}
          </h1>
          <p className="text-center text-muted-foreground max-w-xl mx-auto animate-fadeIn" style={{animationDelay: '100ms'}}>
            {t('app.description', 'Благодарим, что решили помочь нам! Ваши ответы на эти вопросы помогут нам создать устройство мечты 🌈', locale)}
          </p>
        </div>
        
        <div className="bg-card dark:bg-card/40 shadow-md dark:shadow-primary/5 backdrop-blur-sm rounded-xl p-6 md:p-10 animate-scaleIn" style={{animationDelay: '200ms'}}>
          <SurveyForm locale={locale} />
        </div>
        
        <footer className="mt-12 text-center text-sm text-muted-foreground animate-fadeIn" style={{animationDelay: '300ms'}}>
          {formatMessage(t('footer.copyright', '© {year} RNBW. Все права защищены.', locale), { year: currentYear })}
        </footer>
      </main>
    </div>
  );
} 