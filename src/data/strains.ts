export interface Strain {
  name: string;
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
    effects: ["Relaxed", "Sleepy", "Hungry"],
    flavours: ["Nutty", "Earthy", "Herbal"],
    thc: 22.6,
    cbd: 0.0,
    price: "R191.20/g",
    available: true,
    shopUrl: "https://healingbuds.co.za/shop",
  },
];
