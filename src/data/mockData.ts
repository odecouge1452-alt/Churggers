import { MenuItem, MapPinData, Testimonial, FaqItem, CommunityMember } from '../types';
import cajunTwistersImg from '../assets/images/cajun_loaded_twisters.webp';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'churg-classic',
    name: 'Churggers Classic',
    category: 'burgers',
    price: 8.99,
    calories: 680,
    macros: {
      protein: 38,
      carbs: 46,
      fat: 38,
      fiber: 3,
      sugar: 7,
      sodium: 980
    },
    description: 'Double smashed grass-fed beef, melted cheddar cheese, crisp butterhead lettuce, fresh tomato, secret Churggers glaze on toasted brioche.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    isPopular: true,
    tags: ['Best Seller', 'Double Beef']
  },
  {
    id: 'spicy-deluxe',
    name: 'Spicy Deluxe Thunder',
    category: 'burgers',
    price: 9.79,
    calories: 740,
    macros: {
      protein: 44,
      carbs: 54,
      fat: 40,
      fiber: 4,
      sugar: 8,
      sodium: 1140
    },
    description: 'Crispy buttermilk chicken breast or prime beef, pepper jack cheese, pickled jalapeños, smoked bacon strips, and spicy habanero aioli.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    isSpicy: true,
    isPopular: true,
    tags: ['Spicy', 'House Special']
  },
  {
    id: 'truffle-smash',
    name: 'Truffle Bacon Smash',
    category: 'burgers',
    price: 11.49,
    calories: 820,
    macros: {
      protein: 48,
      carbs: 49,
      fat: 50,
      fiber: 3,
      sugar: 6,
      sodium: 1260
    },
    description: 'Charred double beef patty, sautéed balsamic mushrooms, Swiss gruyère, crispy smoked bacon, and black truffle crema.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
    isPopular: true,
    tags: ['Chef Special', 'Truffle']
  },
  {
    id: 'bbq-smokehouse',
    name: 'Smokehouse BBQ Stack',
    category: 'burgers',
    price: 10.29,
    calories: 790,
    macros: {
      protein: 46,
      carbs: 62,
      fat: 42,
      fiber: 4,
      sugar: 14,
      sodium: 1390
    },
    description: 'Smoked pulled beef & smash patty, crispy onion rings, sharp American cheddar, and sweet hickory BBQ sauce.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    tags: ['Smoky', 'Crispy Onions']
  },
  {
    id: 'cheesy-fries',
    name: 'Cheesy Churggers Fries',
    category: 'sides',
    price: 5.49,
    calories: 490,
    macros: {
      protein: 12,
      carbs: 56,
      fat: 25,
      fiber: 5,
      sugar: 3,
      sodium: 840
    },
    description: 'Golden skin-on russet potato fries drenched in warm cheddar fondue, grilled caramelized onions, and house sauce drizzle.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    isPopular: true,
    tags: ['Cheesy', 'Loaded']
  },
  {
    id: 'cajun-twisters',
    name: 'Cajun Loaded Twisters',
    category: 'sides',
    price: 4.99,
    calories: 420,
    macros: {
      protein: 8,
      carbs: 51,
      fat: 21,
      fiber: 4,
      sugar: 2,
      sodium: 780
    },
    description: 'Crispy seasoned spiral potato twisters tossed in Louisiana spices and served with cooling garlic ranch.',
    image: cajunTwistersImg,
    rating: 4.8,
    isSpicy: true,
    tags: ['Crispy', 'Cajun']
  },
  {
    id: 'crispy-tenders',
    name: 'Golden Crunch Wings & Tenders',
    category: 'sides',
    price: 7.29,
    calories: 560,
    macros: {
      protein: 46,
      carbs: 32,
      fat: 28,
      fiber: 2,
      sugar: 2,
      sodium: 1050
    },
    description: '4-piece all-white meat tenders battered in herb crust, served with honey mustard and smoky BBQ dip.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    tags: ['Crispy', 'Protein']
  },
  {
    id: 'strawberry-velvet',
    name: 'Strawberry Velvet Shake',
    category: 'shakes',
    price: 5.99,
    calories: 520,
    macros: {
      protein: 11,
      carbs: 74,
      fat: 20,
      fiber: 2,
      sugar: 62,
      sodium: 260
    },
    description: 'Real California strawberries hand-spun with vanilla bean custard, topped with whipped mountain cream and waffle biscuit.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    isPopular: true,
    tags: ['Real Fruit', 'Hand-Spun']
  },
  {
    id: 'chocolate-fudge',
    name: 'Triple Chocolate Lava Shake',
    category: 'shakes',
    price: 6.29,
    calories: 610,
    macros: {
      protein: 13,
      carbs: 84,
      fat: 25,
      fiber: 4,
      sugar: 69,
      sodium: 310
    },
    description: 'Belgian dark chocolate fudge, chocolate crunch pearls, creamy milk base, and chocolate drizzle rim.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    tags: ['Decadent', 'Chocolate']
  },
  {
    id: 'mango-passion',
    name: 'Mango Passion Cooler',
    category: 'shakes',
    price: 5.49,
    calories: 280,
    macros: {
      protein: 3,
      carbs: 66,
      fat: 1,
      fiber: 3,
      sugar: 56,
      sodium: 45
    },
    description: 'Tropical Alphonso mango purée blended with crushed ice, passionfruit pearls, and fresh mint sprig.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    tags: ['Refreshing', 'Tropical']
  },
  {
    id: 'feast-combo',
    name: 'Grand Churggers Feast Combo',
    category: 'combos',
    price: 15.99,
    calories: 1250,
    macros: {
      protein: 62,
      carbs: 138,
      fat: 54,
      fiber: 8,
      sugar: 48,
      sodium: 2080
    },
    description: 'Churggers Classic burger, large Cheesy Fries, handcrafted Shake of your choice, plus dipping sauces.',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
    isPopular: true,
    tags: ['Best Value', 'Full Meal']
  },
  {
    id: 'duo-box',
    name: 'Duo Crave Box',
    category: 'combos',
    price: 24.99,
    calories: 1980,
    macros: {
      protein: 98,
      carbs: 202,
      fat: 90,
      fiber: 12,
      sugar: 64,
      sodium: 3120
    },
    description: '2 Burgers (Classic + Spicy Deluxe), 2 Medium Fries, 6 Crispy Tenders, and 2 Soft Drinks or Shakes.',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    tags: ['For Two', 'Shareable']
  }
];

export const WORLD_PINS: MapPinData[] = [
  {
    id: 'pin-ny',
    name: 'Churggers Manhattan Flagship',
    city: 'New York',
    country: 'USA',
    coordinates: { x: 29, y: 32 },
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80',
    rating: 4.9,
    address: '742 Broadway, New York, NY 10003',
    hours: '10:00 AM - 2:00 AM Daily',
    phone: '+1 (212) 555-0192',
    specialty: 'Home of the Triple Truffle Smash'
  },
  {
    id: 'pin-la',
    name: 'Churggers Sunset Blvd',
    city: 'Los Angeles',
    country: 'USA',
    coordinates: { x: 15, y: 44 },
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&auto=format&fit=crop&q=80',
    rating: 4.8,
    address: '8900 Sunset Blvd, West Hollywood, CA 90069',
    hours: '10:30 AM - 3:00 AM Daily',
    phone: '+1 (310) 555-0144',
    specialty: 'Drive-Thru & Late Night Patio'
  },
  {
    id: 'pin-london',
    name: 'Churggers Soho Square',
    city: 'London',
    country: 'United Kingdom',
    coordinates: { x: 46, y: 24 },
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=300&auto=format&fit=crop&q=80',
    rating: 4.9,
    address: '14 Soho Square, London W1D 3QG',
    hours: '11:00 AM - 1:00 AM Daily',
    phone: '+44 20 7946 0912',
    specialty: 'Signature British Cheddar Melt'
  },
  {
    id: 'pin-paris',
    name: 'Churggers Champs-Élysées',
    city: 'Paris',
    country: 'France',
    coordinates: { x: 53, y: 38 },
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=300&auto=format&fit=crop&q=80',
    rating: 4.8,
    address: '68 Av. des Champs-Élysées, 75008 Paris',
    hours: '11:00 AM - 12:00 AM Daily',
    phone: '+33 1 42 68 55 00',
    specialty: 'Brioche Bun Bakery on premise'
  },
  {
    id: 'pin-tokyo',
    name: 'Churggers Shibuya Crossing',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: { x: 79, y: 38 },
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&auto=format&fit=crop&q=80',
    rating: 5.0,
    address: '1-23-10 Jinnan, Shibuya City, Tokyo 150-0041',
    hours: '10:00 AM - 4:00 AM Daily',
    phone: '+81 3 5555 0188',
    specialty: 'Wagyu Smash & Wasabi Ranch'
  },
  {
    id: 'pin-sydney',
    name: 'Churggers Darling Harbour',
    city: 'Sydney',
    country: 'Australia',
    coordinates: { x: 86, y: 74 },
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300&auto=format&fit=crop&q=80',
    rating: 4.8,
    address: '25 Harbour St, Sydney NSW 2000',
    hours: '11:00 AM - 11:00 PM Daily',
    phone: '+61 2 9281 0045',
    specialty: 'Waterfront Dining & Milkshake Bar'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: "Thanks to Churggers I can now get my favorite burger anytime, anywhere! The crispy buns and that secret sauce are literally unmatched.",
    name: "Marcus Vance",
    role: "Burger Enthusiast",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    stars: 5
  },
  {
    id: 't2',
    quote: "The delivery is insanely fast and the cheesy fries arrived steaming hot. Hands down the best late-night crave fix in the entire city.",
    name: "Elena Rostova",
    role: "Food Blogger & Critic",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    stars: 5
  },
  {
    id: 't3',
    quote: "That Strawberry Velvet Shake took me straight back to childhood summer diners. 10/10 quality and pristine packaging every single time!",
    name: "Sophia Chen",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    stars: 5
  },
  {
    id: 't4',
    quote: "The Double Truffle Smash burger changed my expectations of fast food completely. Gourmet quality at fast casual prices.",
    name: "David K.",
    role: "Chef & Foodie",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    stars: 5
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is Churggers?',
    answer: 'Churggers is a modern fast-casual restaurant chain dedicated to flavor in your face—freshly smashed 100% grass-fed beef burgers, hand-battered crispy chicken, skin-on cheesy fries, and thick craft shakes made fresh on demand.'
  },
  {
    id: 'faq-2',
    question: 'How to order online?',
    answer: 'You can order directly through our website by clicking the "Order Now" button or using our location search. Pick your nearest Churggers branch, select Pickup or Delivery, customize your burger toppings, and enjoy instant order tracking!'
  },
  {
    id: 'faq-3',
    question: 'What kind of food do you serve?',
    answer: 'We specialize in gourmet smash burgers, artisan fried chicken sandwiches, seasoned curly and cheesy fries, thick hand-spun custard milkshakes, and combo feast boxes with plant-based & gluten-sensitive options.'
  },
  {
    id: 'faq-4',
    question: 'Do you deliver?',
    answer: 'Yes! We deliver hot & fresh via our dedicated fleet and trusted partners with an average delivery time of under 25 minutes. All orders are packed in thermal-insulated, tamper-proof packaging.'
  },
  {
    id: 'faq-5',
    question: 'Are there gluten-free or vegetarian options?',
    answer: 'Absolutely! We offer gluten-free brioche buns, crisp lettuce wrap substitutions for all burgers, and our famous Beyond Plant Smasher patty with vegan cheddar.'
  }
];

export const COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    id: 'cm1',
    name: 'Alex',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    speechText: 'Welcome!!',
    position: { x: 20, y: 22 },
    floatDelay: 0,
    floatDuration: 5.2
  },
  {
    id: 'cm2',
    name: 'Maya',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    speechText: 'Join Us!!',
    socialIcon: 'instagram',
    position: { x: 62, y: 18 },
    floatDelay: 0.8,
    floatDuration: 6.0
  },
  {
    id: 'cm3',
    name: 'Leo',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    speechText: 'Hola!!',
    socialIcon: 'tiktok',
    position: { x: 30, y: 72 },
    floatDelay: 1.4,
    floatDuration: 4.8
  },
  {
    id: 'cm4',
    name: 'Zoe',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    speechText: 'Yum!!',
    socialIcon: 'twitter',
    position: { x: 72, y: 65 },
    floatDelay: 0.5,
    floatDuration: 5.6
  },
  {
    id: 'cm5',
    name: 'Sam',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=120&auto=format&fit=crop&q=80',
    position: { x: 48, y: 44 },
    floatDelay: 1.0,
    floatDuration: 6.4
  },
  {
    id: 'cm6',
    name: 'Chloe',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    position: { x: 82, y: 32 },
    floatDelay: 1.8,
    floatDuration: 5.0
  },
  {
    id: 'cm7',
    name: 'Jordan',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    position: { x: 15, y: 52 },
    floatDelay: 0.3,
    floatDuration: 5.8
  }
];
