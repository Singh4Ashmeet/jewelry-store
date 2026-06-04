export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    home: "Home",
    headline: "Where Elegance Becomes You",
    copy: "Fine jewellery, thoughtfully crafted to celebrate your most precious moments.",
    shop: "Shop New Arrivals",
    collections: "Explore Collections",
  },
  hi: {
    home: "होम",
    headline: "जहां सुंदरता आपकी पहचान बनती है",
    copy: "आपके खास पलों का उत्सव मनाने के लिए सोच-समझकर तैयार की गई फाइन ज्वेलरी।",
    shop: "नई ज्वेलरी देखें",
    collections: "कलेक्शन देखें",
  },
};

export function t(locale: Locale, key: keyof (typeof translations)["en"]) {
  return translations[locale][key];
}
