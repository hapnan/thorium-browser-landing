import { writable } from 'svelte/store';
import type { Language } from './translations';
import { translations } from './translations';

function getDefaultLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const browserLang = navigator.language.split('-')[0];
  const savedLang = localStorage.getItem('preferred-language');
  
  if (savedLang && savedLang in translations) {
    return savedLang as Language;
  }
  
  return (browserLang in translations ? browserLang : 'en') as Language;
}

export const currentLanguage = writable<Language>(getDefaultLanguage());

currentLanguage.subscribe(value => {
  if (typeof window !== 'undefined' && value) {
    localStorage.setItem('preferred-language', value);
    document.documentElement.setAttribute('lang', value);
  }
});