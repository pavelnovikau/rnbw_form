/**
 * Simple internationalization (i18n) utility for the RNBW survey form
 * This provides a foundation for adding multi-language support in the future
 */

// Type for translations object
export type Translations = {
  [key: string]: string;
};

// Define available locales
export const DEFAULT_LOCALE = 'en';
export const LOCALES = ['en']; // Add more languages here as they become available

// Store translations for each locale
const translations: { [locale: string]: Translations } = {
  en: {}, // English translations (can be populated later)
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
  // If the locale doesn't exist in our translations, use the default locale
  if (!translations[locale]) {
    locale = DEFAULT_LOCALE;
  }
  
  // If the key exists in the translations for the locale, return the translation
  // Otherwise, return the default text
  return translations[locale][key] || defaultText;
}

/**
 * Set translations for a specific locale
 * @param locale Locale code (e.g., 'en', 'fr', 'es')
 * @param data Translations object
 */
export function setTranslations(locale: string, data: Translations): void {
  translations[locale] = { ...translations[locale], ...data };
}

/**
 * Format a string with variables
 * @param text Text with placeholders (e.g., "Hello, {name}!")
 * @param variables Object with variable values (e.g., { name: "World" })
 * @returns Formatted string (e.g., "Hello, World!")
 */
export function formatString(text: string, variables: { [key: string]: string | number }): string {
  return text.replace(/{(\w+)}/g, (match, key) => {
    return variables[key] !== undefined ? String(variables[key]) : match;
  });
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