import { vegetablesProducts } from "../data/vegetables";
import { cafeProducts } from "../data/cafe";
import { coffeeProducts } from "../data/coffee";
import { foodProducts } from "../data/food";

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
  mobilePayPhone: import.meta.env.VITE_MOBILEPAY_PHONE_CAFE,
};

const coffeeStore: StoreConfig = {
  path: "/coffee",
  title: "Kaffelugen",
  emoji: "☕",
  products: coffeeProducts,
  mobilePayPhone: import.meta.env.VITE_MOBILEPAY_PHONE_COFFEE,
};

const foodStore: StoreConfig = {
  path: "/food",
  title: "Madboden",
  emoji: "🌭",
  products: foodProducts,
  mobilePayPhone: import.meta.env.VITE_MOBILEPAY_PHONE_FOOD,
};

export const stores: StoreConfig[] = [vegetablesStore, cafeStore, coffeeStore, foodStore];

export function getStoreByPath(path: string): StoreConfig {
  return stores.find((store) => store.path === path) ?? vegetablesStore;
}
