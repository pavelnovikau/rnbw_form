/**
 * Simple internationalization (i18n) utility for the RNBW survey form
 * This provides a foundation for adding multi-language support in the future
 */

// Type for translations object
export type Translations = {
  [key: string]: string;
};

// Define available locales
export const DEFAULT_LOCALE = 'ru';
export const LOCALES = ['ru', 'en']; // Add more languages here as they become available

// Store translations for each locale
const translations: { [locale: string]: Translations } = {
  ru: {},  // Russian translations
  en: {},  // English translations (to be added later)
  // Add more languages here as they become available
};

/**
 * Translate a key to the current locale
 * @param key Translation key
 * @param defaultText Default text to use if translation is not found
 * @param locale Locale to use (defaults to English)
 * @returns Translated text or default text
 */
export function t(key: string, defaultText: string, locale = DEFAULT_LOCALE): string {
  if (!translations[locale] || !translations[locale][key]) {
    return defaultText;
  }
  return translations[locale][key];
}

/**
 * Set translations for a specific locale
 * @param locale Locale code (e.g., 'en', 'fr', 'es')
 * @param data Translations object
 */
export function setTranslations(locale: string, data: Translations): void {
  translations[locale] = data;
}

/**
 * Format a string with variables
 * @param text Text with placeholders (e.g., "Hello, {name}!")
 * @param variables Object with variable values (e.g., { name: "World" })
 * @returns Formatted string (e.g., "Hello, World!")
 */
export function formatString(text: string, variables: { [key: string]: string | number }): string {
  return Object.entries(variables).reduce(
    (result, [key, value]) => result.replace(new RegExp(`{${key}}`, 'g'), String(value)),
    text
  );
}

// Export additional helpers for future use
export function getCurrentLocale(): string {
  // In the future, this could detect the user's preferred language
  // For now, just return the default locale
  return DEFAULT_LOCALE;
}

export function switchLocale(locale: string): boolean {
  // Check if the requested locale is available
  if (LOCALES.includes(locale)) {
    // For future use: set the current locale in a more permanent way
    return true;
  }
  return false;
} 