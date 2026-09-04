import { vegetables } from "../data/vegetables";
import { cafe } from "../data/cafe";
import { coffee } from "../data/coffee";

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
  products: vegetables,
  mobilePayPhone: import.meta.env.VITE_MOBILEPAY_PHONE_VEGETABLES,
};

const cafeStore: StoreConfig = {
  path: "/cafe",
  title: "Caféen",
  emoji: "🥪",
  products: cafe,
  mobilePayPhone: "",
};

const coffeeStore: StoreConfig = {
  path: "/coffee",
  title: "Kaffelugen",
  emoji: "☕",
  products: coffee,
  mobilePayPhone: "",
};

export const stores: StoreConfig[] = [vegetablesStore, cafeStore, coffeeStore];

export function getStoreByPath(path: string): StoreConfig {
  return stores.find((store) => store.path === path) ?? vegetablesStore;
}
