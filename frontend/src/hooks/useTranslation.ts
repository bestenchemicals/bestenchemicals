import { useState, useEffect } from "react";
import enTranslations from "../i18n/en.json";

type TranslationData = Record<string, any>;

let currentLocale = "en";
let translations: TranslationData = enTranslations;

// Simple i18n implementation with direct import
export const loadTranslations = (locale: string = "en") => {
  // For now, we only have English. You can extend this later
  if (locale === "en") {
    translations = enTranslations;
    currentLocale = locale;
  }
};

export const useTranslation = () => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    // Load translations on mount
    loadTranslations();
    forceUpdate({});
  }, []);

  const t = (path: string): string => {
    const keys = path.split(".");
    let value: any = translations;

    for (const key of keys) {
      if (value && typeof value === "object") {
        value = value[key];
      } else {
        console.warn(`Translation not found for path: ${path}`);
        return path;
      }
    }

    return typeof value === "string" ? value : path;
  };

  const tArray = (path: string): any[] => {
    const keys = path.split(".");
    let value: any = translations;

    for (const key of keys) {
      if (value && typeof value === "object") {
        value = value[key];
      } else {
        console.warn(`Translation array not found for path: ${path}`);
        return [];
      }
    }

    return Array.isArray(value) ? value : [];
  };

  return { t, tArray, locale: currentLocale };
};
