import { Product, StoreSettings } from '../types';

export const INITIAL_SETTINGS: StoreSettings = {
  whatsappNumber: '+923001234567',
  brandName: 'STRIDE LONDON',
  tagline: 'STEP BOLD. LIVE STYLISH.',
  currency: 'PKR',
  announcement: 'Complimentary Insured Nationwide & Express Worldwide Courier on All Leather Orders',
  londonShowroom: '18 Savile Row, Mayfair, London W1S 3PW',
  craftStudio: 'Bespoke Atelier, Heritage Quarter, Lahore, Pakistan',
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'The Mayfair Asymmetric Biker Jacket',
    slug: 'the-mayfair-asymmetric-biker-jacket',
    category: 'jackets',
    price: 48500,
    salePrice: 42000,
    description: 'Precision-tailored from select 1.2mm full-grain naked calfskin. Features antique silver YKK Excella zippers, diamond-quilted cupro lining, and hand-burnished lapels that patinate gracefully with every journey.',
    craftDetails: [
      '100% Full-Grain Naked Calfskin (1.2mm weight)',
      'Hand-waxed and burnished by master craftsmen',
      'Heavy-duty Japanese YKK Excella antique metal hardware',
      'Diamond-quilted breathable cupro interior lining',
      'Two internal concealed passport/valet pockets'
    ],
    images: [
      '/src/assets/images/leather_biker_jacket_real_1793989042539.jpg',
      '/src/assets/images/hero_model_sitting_wall_real_1793989059137.jpg',
      '/src/assets/images/tannery_workshop_craft_real_1793989163039.jpg'
    ],
    primaryImage: '/src/assets/images/leather_biker_jacket_real_1793989042539.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Midnight Black', hex: '#0B0B0B' },
      { name: 'Espresso Brown', hex: '#2B1E16' },
      { name: 'Oxblood Deep', hex: '#4A151B' }
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    order: 1,
    stock: 14,
    collectionTag: 'bestseller',
    hotspots: [
      { x: 38, y: 22, title: 'Hand-Cut Lapel', description: 'Sculpted from prime hide cuts for flawless roll and drape.' },
      { x: 48, y: 48, title: 'Antique Excella Zip', description: 'Double-slide heavy gauge brass zipper with antique satin finish.' },
      { x: 78, y: 72, title: 'Artisan Gusset', description: 'Bi-swing action shoulder panels for unrestricted movement.' }
    ]
  },
  {
    id: 'prod-2',
    name: 'Savile Double-Monk Strap Dress Shoes',
    slug: 'savile-double-monk-strap-shoes',
    category: 'shoes',
    price: 36000,
    salePrice: 31500,
    description: 'A masterpiece of classic British silhouette. Crafted using Goodyear welt construction on an elegant almond toe last with hand-patinated Italian crust leather and solid brushed brass buckles.',
    craftDetails: [
      'Goodyear-welted sole construction (fully resolable)',
      'Hand-applied museum patina finish in cognac',
      'Solid forged brushed brass buckles',
      'Vegetable-tanned leather sole with rubber heel injection',
      'Full calfskin glove lining with cushioned arch support'
    ],
    images: [
      '/src/assets/images/leather_monk_strap_shoes_real_1793989042490.jpg',
      '/src/assets/images/tannery_workshop_craft_real_1793989163039.jpg'
    ],
    primaryImage: '/src/assets/images/leather_monk_strap_shoes_real_1793989042490.jpg',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Cognac Patina', hex: '#9E5B32' },
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Antique Bordeaux', hex: '#581825' }
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    order: 2,
    stock: 8,
    collectionTag: 'classic',
    hotspots: [
      { x: 35, y: 45, title: 'Brushed Brass Buckles', description: 'Custom-cast hardware secured by heavy-gauge elastic anchors.' },
      { x: 65, y: 62, title: 'Hand-Brogued Medallion', description: 'Traditional perforations applied by hand needle stamp.' }
    ]
  },
  {
    id: 'prod-3',
    name: 'Bond Street Burnished Chelsea Boots',
    slug: 'bond-street-burnished-chelsea-boots',
    category: 'shoes',
    price: 38000,
    salePrice: 34500,
    description: 'Iconic London Chelsea boot reimagined with premium full-grain Italian box calf leather. Built with reinforced woven elastic gussets and Vibram studded rubber half-soles for refined all-weather traction.',
    craftDetails: [
      'Single-piece wholecut leather vamp construction',
      'Goodyear storm welt for moisture resistance',
      'High-recovery woven elasticated side panels',
      'Reinforced leather pull tabs with embossed monogram',
      'Layered compressed leather stack heel with rubber cap'
    ],
    images: [
      '/src/assets/images/leather_chelsea_boots_real_1793989043651.jpg',
      '/src/assets/images/tannery_workshop_craft_real_1793989163039.jpg'
    ],
    primaryImage: '/src/assets/images/leather_chelsea_boots_real_1793989043651.jpg',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Midnight Onyx', hex: '#0B0B0B' },
      { name: 'Dark Chocolate', hex: '#2C1D18' }
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isPublished: true,
    order: 3,
    stock: 11,
    collectionTag: 'new',
    hotspots: [
      { x: 60, y: 40, title: 'Elastic Gusset', description: 'Heavy-gauge memory weave panel engineered to retain shape for years.' },
      { x: 55, y: 75, title: 'Stacked Heel', description: 'Hand-cut veg-tan leather lifts pinned with antique brass nails.' }
    ]
  },
  {
    id: 'prod-4',
    name: 'The Kensington Heritage Bifold Wallet',
    slug: 'the-kensington-heritage-bifold-wallet',
    category: 'wallets',
    price: 11500,
    salePrice: 9500,
    description: 'Handcrafted from vegetable-tanned whiskey harness leather. Designed with a slim profile that holds 8 cards, currency bill compartment, and RFID blocking foil woven between leather layers.',
    craftDetails: [
      'Full-grain saddle harness leather that develops deep patina',
      'Saddle-stitched by hand using waxed German linen thread',
      'Beeswax burnished and hand-painted raw edges',
      'Built-in ultra-thin RFID protective barrier',
      'Curved thumb slide slots for effortless card access'
    ],
    images: [
      '/src/assets/images/leather_bifold_wallet_real_1793989044375.jpg',
      '/src/assets/images/tannery_workshop_craft_real_1793989163039.jpg'
    ],
    primaryImage: '/src/assets/images/leather_bifold_wallet_real_1793989044375.jpg',
    sizes: ['Standard Bifold'],
    colors: [
      { name: 'Whiskey Tan', hex: '#B2672B' },
      { name: 'Raven Black', hex: '#111111' },
      { name: 'Havana Brown', hex: '#3E271D' }
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    order: 4,
    stock: 25,
    collectionTag: 'bestseller',
    hotspots: [
      { x: 30, y: 40, title: 'Hand-Skived Pockets', description: 'Ultra-thin leather skiving ensures a pocket-friendly flat profile.' },
      { x: 70, y: 65, title: 'Linen Stitching', description: 'Waxed thread lock-stitched for unmatched seam longevity.' }
    ]
  },
  {
    id: 'prod-5',
    name: 'Artisan Bridle Leather Dress Belt',
    slug: 'artisan-bridle-leather-dress-belt',
    category: 'belts',
    price: 14000,
    salePrice: 11900,
    description: 'Cut from 10oz English bridle leather, renowned for its immense tensile strength and satin tallow finish. Accented with a solid forged brass roller buckle secured by Chicago screws.',
    craftDetails: [
      '10-12oz heavyweight English vegetable-tanned bridle leather',
      'Solid machined brass roller buckle in matte brushed gold',
      'Hand-beveled and friction-burnished edge sealing',
      'Interchangeable buckle design via solid brass Chicago screws',
      'Teardrop adjustment holes for seamless buckle prong seating'
    ],
    images: [
      '/src/assets/images/leather_bridle_belt_real_1793989044358.jpg',
      '/src/assets/images/tannery_workshop_craft_real_1793989163039.jpg'
    ],
    primaryImage: '/src/assets/images/leather_bridle_belt_real_1793989044358.jpg',
    sizes: ['30', '32', '34', '36', '38', '40', '42'],
    colors: [
      { name: 'Espresso Bridle', hex: '#321E17' },
      { name: 'Pitch Black', hex: '#0B0B0B' },
      { name: 'British Tan', hex: '#995B28' }
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    isPublished: true,
    order: 5,
    stock: 18,
    collectionTag: 'classic',
    hotspots: [
      { x: 45, y: 55, title: 'Forged Solid Brass', description: 'Roller buckle engineered to glide gently over leather grain.' },
      { x: 75, y: 40, title: 'Burnished Edge', description: 'Treated with organic gum tragacanth and polished by hand wood slicker.' }
    ]
  },
  {
    id: 'prod-6',
    name: 'Heritage Brass Valet Key Fob',
    slug: 'heritage-brass-valet-key-fob',
    category: 'keychains',
    price: 5500,
    salePrice: 4500,
    description: 'Crafted from bridle leather offcuts in our zero-waste initiative. Features a heavy solid brass split ring and custom Chicago screw with subtle embossed Stride London monogram.',
    craftDetails: [
      'Full-grain bridle leather strap with double perimeter stitching',
      'Solid unlacquered raw brass split ring and hardware',
      'Quick-release spring-loaded trigger snap',
      'Ages alongside your daily carry into a bespoke heirloom',
      'Hand-stamped golden S monogram emblem'
    ],
    images: [
      '/src/assets/images/leather_keychain_fob_real_1793989057553.jpg',
      '/src/assets/images/tannery_workshop_craft_real_1793989163039.jpg'
    ],
    primaryImage: '/src/assets/images/leather_keychain_fob_real_1793989057553.jpg',
    sizes: ['Standard Loop'],
    colors: [
      { name: 'Onyx Black', hex: '#0B0B0B' },
      { name: 'Cognac Leather', hex: '#8B4513' }
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isPublished: true,
    order: 6,
    stock: 35,
    collectionTag: 'modern',
    hotspots: [
      { x: 40, y: 50, title: 'Snap Rivet', description: 'Solid antiqued brass rivet securing high-tensile loop.' },
      { x: 65, y: 70, title: 'Solid Brass Ring', description: 'Beveled split ring capable of carrying substantial keychain bundles.' }
    ]
  },
  {
    id: 'prod-7',
    name: 'Westminster Cafe Racer Leather Jacket',
    slug: 'westminster-cafe-racer-leather-jacket',
    category: 'jackets',
    price: 44000,
    salePrice: 39000,
    description: 'The definitive minimalist British motorcycle jacket. Featuring a clean stand snap-tab collar, straight front zip, zippered cuffs, and hand-rubbed oil finish that shrugs off London mist.',
    craftDetails: [
      'Semi-aniline tumbled calfskin with water-resistant wax bath',
      'Snap-tab Mandarin throat latch collar',
      'Gusseted racing wrist cuffs with antique brass zippers',
      'Tonal charcoal viscose satin body lining',
      'Reinforced shoulder and elbow articulation quilting'
    ],
    images: [
      '/src/assets/images/leather_cafe_racer_real_1793989058470.jpg',
      '/src/assets/images/leather_biker_jacket_real_1793989042539.jpg'
    ],
    primaryImage: '/src/assets/images/leather_cafe_racer_real_1793989058470.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal Black', hex: '#141414' },
      { name: 'Vintage Havana', hex: '#3B2418' }
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    order: 7,
    stock: 9,
    collectionTag: 'modern'
  },
  {
    id: 'prod-8',
    name: 'Piccadilly Minimalist Cardholder',
    slug: 'piccadilly-minimalist-cardholder',
    category: 'wallets',
    price: 7500,
    salePrice: 6200,
    description: 'Engineered for modern front-pocket carriage. Houses 6 cards plus a central folded cash slot. Made with butter-soft French box calfskin and hand-creased perimeter lines.',
    craftDetails: [
      'Ultra-thin 0.8mm French box calf leather',
      'Four external card slots plus central cash pocket',
      'Heat-creased decorative border detailing',
      'Hand-buffed edge paint in signature charcoal',
      'RFID protective shield insert'
    ],
    images: [
      '/src/assets/images/leather_cardholder_wallet_real_1793989059004.jpg',
      '/src/assets/images/leather_bifold_wallet_real_1793989044375.jpg'
    ],
    primaryImage: '/src/assets/images/leather_cardholder_wallet_real_1793989059004.jpg',
    sizes: ['Ultra Slim'],
    colors: [
      { name: 'Whiskey Calf', hex: '#9E5B32' },
      { name: 'Jet Black', hex: '#0B0B0B' },
      { name: 'Racing Green', hex: '#1E3524' }
    ],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    order: 8,
    stock: 22,
    collectionTag: 'classic'
  }
];
