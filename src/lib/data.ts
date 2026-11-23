export type Category = "bouquets" | "gift-sets" | "snack-baskets" | "masehri";
export interface Product {
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  occasion: string;
  popular: number;
  image?: string;
}
const mk = (
  category: Category,
  rows: [string, number, string, string, string?][],
  // i: number,
): Product[] =>
  rows.map(([name, price, occasion, description, image = ""], i) => ({
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    category,
    price,
    occasion,
    description,
    popular: 10 - i,
    image: image || "",
  }));
export const categories: {
  slug: Category;
  name: string;
  blurb: string;
  image: string;
}[] = [
  {
    slug: "bouquets",
    name: "Bouquets",
    blurb: "Fresh flowers, hand-tied with care",
    image: "/images/red-roses-bouquet.jpeg",
  },
  {
    slug: "gift-sets",
    name: "Gift Sets",
    blurb: "Hampers for every occasion",
    image: "/images/gift2.jpeg",
  },
  {
    slug: "snack-baskets",
    name: "Custom Snack Baskets",
    blurb: "Build a basket they will love",
    image: "/images/snack1.jpeg",
  },
  {
    slug: "masehri",
    name: "Masehri Decoration",
    blurb: "Bridal canopy décor, beautifully done",
    image: "/images/masehr3.jpeg",
  },
];
export const products: Product[] = [
  ...mk("bouquets", [
    [
      "Classic Red Rose Bouquet",
      3500,
      "Valentine’s Day",
      "Twelve long-stem red roses, wrapped in ivory paper.",
      "/images/red-roses-bouquet.jpeg",
    ],
    [
      "Blush Garden Mix",
      2800,
      "Birthday",
      "Soft pink roses and lisianthus.",
      "/images/pink-garden-roses.jpeg",
    ],
    [
      "Sage & Ivory Elegance",
      4200,
      "Anniversary",
      "Neutral tones with eucalyptus.",
      "/images/ivory-roses.jpeg",
    ],
    [
      "Mother’s Day Peonies",
      5500,
      "Mother’s Day",
      "Lush seasonal blooms.",
      "/images/cloar-pink.jpeg",
    ],
    [
      "Eid Mubarak Posy",
      1800,
      "Eid",
      "A cheerful small posy.",
      "/images/floral-posy.jpeg",
    ],
    [
      "Royal Luxe Grande",
      12000,
      "Wedding",
      "Statement bouquet of 60 premium roses.",
      "/images/massive-bouquet.jpeg",
    ],
  ]),
  ...mk("gift-sets", [
    [
      "Perfume & Chocolate Duo",
      4500,
      "Birthday",
      "Designer-inspired fragrance with fine chocolates.",
      "/images/gift1.jpeg",
    ],
    [
      "Anniversary Keepsake Hamper",
      7500,
      "Anniversary",
      "Candle, chocolates and a photo frame.",
      "/images/gift2.jpeg",
    ],
    [
      "Bridal Blessings Box",
      12000,
      "Wedding",
      "Curated gifts for the bride.",
      "/images/gift3.jpeg",
    ],
    [
      "Groom Essentials Set",
      9500,
      "Wedding",
      "Grooming and fragrance set.",
      "/images/gift4.jpeg",
    ],
    [
      "Eid Sweet Hamper",
      2500,
      "Eid",
      "Dates, mithai and nuts.",
      "/images/gift5.jpeg",
    ],
    [
      "Luxe Celebration Trunk",
      15000,
      "Wedding",
      "Our grandest hamper.",
      "/images/gift6.jpeg",
    ],
  ]),
  ...mk("snack-baskets", [
    [
      "Petite Snack Basket",
      2000,
      "Birthday",
      "Small basket, your choice of treats.",
      "/images/snack1.jpeg",
    ],
    [
      "Classic Snack Basket",
      3500,
      "Birthday",
      "Medium basket with chocolates and chips.",
      "/images/snack2.jpeg",
    ],
    [
      "Movie Night Basket",
      4500,
      "Anniversary",
      "Popcorn, candy and drinks.",
      "/images/snack3.jpeg",
    ],
    // ["Study Break Basket", 3000, "Exam", "Energy snacks and tea.", "/images/snack3.jpeg"],
    [
      "Family Feast Basket",
      7000,
      "Eid",
      "Generous large basket.",
      "/images/snack4.jpeg",
    ],
    [
      "Grand Gourmet Basket",
      10000,
      "Wedding",
      "Premium imported treats.",
      "/images/snack5.jpeg",
    ],
  ]),
  ...mk("masehri", [
    [
      "Basic Masehri Package",
      25000,
      "Nikah",
      "Fabric canopy with fresh flowers and fairy lights.",
      "/images/masehr2.jpeg",
    ],
    [
      "Standard Masehri Package",
      50000,
      "Mehndi",
      "Floral canopy, lights and bedside décor.",
      "/images/masehr1.jpeg",
    ],
    [
      "Premium Masehri Package",
      90000,
      "Walima",
      "Full floral canopy, curtains and room styling.",
      "/images/masehr3.jpeg",
    ],
  ]),
];
