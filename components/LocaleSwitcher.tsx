import { useState, useEffect } from 'react';
import { GlobeIcon } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '../lib/i18n';

type LocaleSwitcherProps = {
  onChange: (locale: Locale) => void;
};

export function LocaleSwitcher({ onChange }: LocaleSwitcherProps) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(DEFAULT_LOCALE);
  
  useEffect(() => {
    // Get locale from localStorage if available
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && (savedLocale === 'ru' || savedLocale === 'en')) {
      console.log('LocaleSwitcher: Loading saved locale from localStorage:', savedLocale);
      setCurrentLocale(savedLocale as Locale);
    } else {
      console.log('LocaleSwitcher: Using default locale:', DEFAULT_LOCALE);
    }
  }, []);
  
  useEffect(() => {
    // Save locale to localStorage when it changes
    console.log('LocaleSwitcher: Setting locale to:', currentLocale);
    localStorage.setItem('locale', currentLocale);
    // Notify parent component of locale change
    onChange(currentLocale);
  }, [currentLocale, onChange]);
  
  const toggleLocale = () => {
    const newLocale = currentLocale === 'ru' ? 'en' : 'ru';
    console.log('LocaleSwitcher: Toggle locale from', currentLocale, 'to', newLocale);
    setCurrentLocale(newLocale);
  };
  
  return (
    <button
      onClick={toggleLocale}
      className="fixed top-4 right-4 flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-sm px-3 py-2 text-sm font-medium border border-accent/20 hover:border-accent/50 transition-all z-50"
      aria-label="Switch language"
    >
      <GlobeIcon size={16} className="text-accent" />
      <span className="uppercase">{currentLocale === 'ru' ? 'En' : 'Ru'}</span>
    </button>
  );
} 