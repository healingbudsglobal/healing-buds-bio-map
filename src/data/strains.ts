import blockberryImg from "@/assets/strains/blockberry.jpg";
import blueZushiImg from "@/assets/strains/blue-zushi.jpg";
import candyPaveImg from "@/assets/strains/candy-pave.jpg";
import caribbeanBreezeImg from "@/assets/strains/caribbean-breeze.jpg";
import femmeFataleImg from "@/assets/strains/femme-fatale.jpg";
import nfs12Img from "@/assets/strains/nfs-12.jpg";
import peanutButterBreathImg from "@/assets/strains/peanut-butter-breath.jpg";

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
  imageUrl: string;
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
    imageUrl: blockberryImg,
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
    imageUrl: blueZushiImg,
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
    imageUrl: candyPaveImg,
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
    imageUrl: caribbeanBreezeImg,
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
    imageUrl: femmeFataleImg,
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
    imageUrl: nfs12Img,
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
    imageUrl: peanutButterBreathImg,
  },
];
