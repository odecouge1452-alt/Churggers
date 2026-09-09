export interface MacroNutrients {
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  fiber?: number;  // in grams
  sugar?: number;  // in grams
  sodium?: number; // in mg
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'burgers' | 'sides' | 'shakes' | 'combos';
  price: number;
  calories: number;
  macros?: MacroNutrients;
  description: string;
  image: string;
  rating: number;
  isSpicy?: boolean;
  isPopular?: boolean;
  tags?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedOptions?: string[];
}

export interface MapPinData {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: { x: number; y: number }; // Percentage relative on SVG map
  image: string;
  rating: number;
  address: string;
  hours: string;
  phone: string;
  specialty: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  stars: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  speechText?: string;
  socialIcon?: 'instagram' | 'tiktok' | 'twitter';
  position: { x: number; y: number };
  floatDelay: number;
  floatDuration: number;
}
