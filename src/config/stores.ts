import { vegetables } from "../data/vegetables";
import { cafe } from "../data/cafe";
import type { Product } from "../data/vegetables";

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

export const stores: StoreConfig[] = [vegetablesStore, cafeStore];

export function getStoreByPath(path: string): StoreConfig {
  return stores.find((store) => store.path === path) ?? vegetablesStore;
}
