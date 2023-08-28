/// <reference types="astro/client-image" />

declare interface IPagination {
  page: number;
  pageSize: number;
  totalRecords: number;
}

declare interface Menu {
  name: string;
  slug: string;
  title: string;
  description: string;
  banner: string;
  subMenu: { name: string; slug: string }[];
}
declare interface Footer {
  name: string;
  menu: { name: string; slug: string }[];
}

declare interface Banner {
  url: string;
  path: string;
}
interface BaseProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  thumbnail: string;
  originalPrice?: number;
  colors: {
    code: string;
    color: string;
  }[];
  sizes?: Array<{ code: string; name: string }>;
  band?: Array<{ code: string; name: string }>;
  cup?: Array<{ code: string; name: string }>;
}

interface Product extends BaseProduct {
  isNew?: boolean;
  rating: number;
  isFave?: boolean;
  totalRating?: number;
  options?: {
    code: string;
    color: string;
    thumbnail?: string;
  }[];
}

interface ProductDetail extends Product {
  styleNotes: string;
  features: string;
  sizingMaterial: string;
  shipping: string;
  keyFeatures?: Array<{
    title?: string;
    description?: string;
  }>;
  images: string[];
  completeLook: BaseProduct[];
}

declare interface Question {
  name: string;
  email: string;
  question: string;
  dislike: number;
  like: number;
  createdAt: Date;
  answers: { name: string; createdAt: Date; answers: string }[];
}
declare interface Review {
  name: string;
  email: string;
  status: string;
  purchasedSize: number;
  usualSize: number;
  cup: string;
  rating: number;
  title: string;
  trueToSize: number;
  trueToSizeCup: number;
  trueToSizeBand: number;
  pairsWellWith: string;
  description: string;
  dislike: number;
  like: number;
  createdAt: string;
}
declare interface ReviewsOverview {
  totalRecords: { questions?: number; reviews?: number };
  averageReviews: number;
  totalTrueToSize: number;
  totalTrueToCup: number;
  totalTrueToBand: number;
  totalRatings: { value: number; count: number }[];
}

declare interface Category {
  name: string;
  url: string;
  path: string;
}
declare interface Advertising extends Category {}

declare interface BestSeller {
  thumbnail: string;
  rating: number;
  totalRating: number;
  name: string;
  price: number;
  options: { code: string; color: string }[];
}

declare interface Promotion {
  url: string;
  path: string;
}

declare interface CrewRaving {
  comment: string;
  name: string;
  rating: number;
  product: Product;
}

declare interface Input {
  name: string;
  required?: { value: boolean; message: string };
  type: string;
  label?: string;
  placeholder?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  defaultValue?: string;
  value?: string | number;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  disabled?: boolean;
  data?: { label: string; value: string }[];
  className?: string;
  options?: {
    value: string | number;
    hidden?: boolean;
    text: string;
  }[];
}

declare interface Countries {
  name: string;
  code: string;
  provinces: { code: string; name: string }[];
}

//SETTING COLOR

declare interface Color {
  name: string;
  color: string;
}
declare interface Size {
  name: string;
  code: string;
}
declare type Tab = { label: string; render: React.ReactElement; value: number };
