import { vegetablesProducts } from "../data/vegetables";
import { cafeProducts } from "../data/cafe";
import { coffeeProducts } from "../data/coffee";

export interface Product {
  id: string;
  name: string;
  price: number;
  emoji: string;
  index: number;
}

export interface StoreConfig {
  path: string;
  title: string;
  emoji: string;
  products: Product[];
  mobilePayPhone: string;
}

const vegetablesStore: StoreConfig = {
  path: "/vegetables",
  title: "Grøntsager",
  emoji: "🥕",
  products: vegetablesProducts,
  mobilePayPhone: import.meta.env.VITE_MOBILEPAY_PHONE_VEGETABLES,
};

const cafeStore: StoreConfig = {
  path: "/cafe",
  title: "Caféen",
  emoji: "🥪",
  products: cafeProducts,
  mobilePayPhone: "",
};

const coffeeStore: StoreConfig = {
  path: "/coffee",
  title: "Kaffelugen",
  emoji: "☕",
  products: coffeeProducts,
  mobilePayPhone: "",
};

export const stores: StoreConfig[] = [vegetablesStore, cafeStore, coffeeStore];

export function getStoreByPath(path: string): StoreConfig {
  return stores.find((store) => store.path === path) ?? vegetablesStore;
}
