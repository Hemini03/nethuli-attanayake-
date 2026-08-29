export type Locale = "fr" | "en";

export type Localized = {
  fr: string;
  en: string;
};

export type FashionImage = {
  src: string;
  alt: Localized;
  photographer?: string;
  photographerUrl?: string;
  width: number;
  height: number;
};

export type Look = {
  number: string;
  title: Localized;
  image: FashionImage;
};

export type ProcessKind = "sketch" | "fabric" | "toile";

export type ProcessItem = {
  kind: ProcessKind;
  title: Localized;
  caption: Localized;
  image: FashionImage;
};

export type Collection = {
  slug: string;
  title: string;
  season: string;
  year: string;
  excerpt: Localized;
  story: Localized;
  cover: FashionImage;
  looks: Look[];
  process: ProcessItem[];
};

export type JournalPost = {
  slug: string;
  title: Localized;
  date: string;
  excerpt: Localized;
  body: Localized;
  cover: FashionImage;
};

export type EducationItem = {
  year: string;
  school: Localized;
  detail: Localized;
};

export type SiteContent = {
  designer: string;
  location: Localized;
  email: string;
  instagram: string;
  instagramUrl: string;
  address: Localized;
  manifesto: Localized;
  availability: Localized;
  bio: Localized;
  education: EducationItem[];
  skills: Localized[];
  portrait: FashionImage;
  heroCollectionSlug: string;
  collections: Collection[];
  journal: JournalPost[];
};

export function loc(value: Localized, locale: Locale): string {
  return value[locale];
}
