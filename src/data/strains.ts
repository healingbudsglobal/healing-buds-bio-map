export type StrainType = "indica" | "sativa" | "hybrid";

export interface Strain {
  name: string;
  type: StrainType;
  effects: string[];
  flavours: string[];
  thc: number;
  cbd: number;
  price: string;
  available: boolean;
  shopUrl: string;
}

export const strains: Strain[] = [
  {
    name: "BlockBerry",
    type: "indica",
    effects: ["Relaxed", "Sleepy", "Hungry"],
    flavours: ["Berry", "Vanilla", "Citrus"],
    thc: 23.0,
    cbd: 0.1,
    price: "R191.20/g",
    available: true,
    shopUrl: "https://healingbuds.co.za/shop",
  },
  {
    name: "Blue Zushi",
    type: "hybrid",
    effects: ["Focused", "Relaxed", "Euphoric"],
    flavours: ["Fruit", "Mint", "Diesel"],
    thc: 21.9,
    cbd: 0.1,
    price: "R191.20/g",
    available: true,
    shopUrl: "https://healingbuds.co.za/shop",
  },
  {
    name: "Candy Pave",
    type: "sativa",
    effects: ["Giggly", "Euphoric", "Uplifted"],
    flavours: ["Candy", "Floral", "Creamy"],
    thc: 24.5,
    cbd: 0.0,
    price: "R191.20/g",
    available: true,
    shopUrl: "https://healingbuds.co.za/shop",
  },
  {
    name: "Caribbean Breeze",
    type: "sativa",
    effects: ["Energetic", "Happy", "Uplifted"],
    flavours: ["Tropical", "Citrus", "Pineapple"],
    thc: 23.0,
    cbd: 0.0,
    price: "R173.80/g",
    available: false,
    shopUrl: "https://healingbuds.co.za/shop",
  },
  {
    name: "Femme Fatale",
    type: "hybrid",
    effects: ["Relaxed", "Happy", "Sleepy"],
    flavours: ["Grape", "Tropical", "Pear"],
    thc: 21.9,
    cbd: 0.1,
    price: "R173.80/g",
    available: false,
    shopUrl: "https://healingbuds.co.za/shop",
  },
  {
    name: "NFS 12",
    type: "indica",
    effects: ["Relaxed", "Sleepy", "Euphoric"],
    flavours: ["Pine", "Diesel", "Spicy"],
    thc: 17.5,
    cbd: 0.1,
    price: "R191.20/g",
    available: true,
    shopUrl: "https://healingbuds.co.za/shop",
  },
  {
    name: "Peanut Butter Breath",
    type: "hybrid",
    effects: ["Relaxed", "Sleepy", "Hungry"],
    flavours: ["Nutty", "Earthy", "Herbal"],
    thc: 22.6,
    cbd: 0.0,
    price: "R191.20/g",
    available: true,
    shopUrl: "https://healingbuds.co.za/shop",
  },
];
