import { cafeProducts } from "../data/cafe";
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

const cafeStore: StoreConfig = {
  path: "/cafe",
  title: "Caféen",
  emoji: "☕",
  products: cafeProducts,
  mobilePayPhone: import.meta.env.VITE_MOBILEPAY_PHONE_CAFE,
};

const foodStore: StoreConfig = {
  path: "/food",
  title: "Madboden",
  emoji: "🌭",
  products: foodProducts,
  mobilePayPhone: import.meta.env.VITE_MOBILEPAY_PHONE_FOOD,
};

export const stores: StoreConfig[] = [cafeStore, foodStore];

export function getStoreByPath(path: string): StoreConfig {
  return stores.find((store) => store.path === path) ?? cafeStore;
}
