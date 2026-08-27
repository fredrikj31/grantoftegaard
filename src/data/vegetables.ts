export interface Product {
  id: string;
  name: string;
  price: number;
  emoji: string;
  index: number;
}

export const vegetables: Product[] = [
  { id: "veg-1", name: "Bispehue", price: 35, emoji: "🎃", index: 1 },
  { id: "veg-2", name: "Blomster", price: 30, emoji: "🌼", index: 2 },
  { id: "veg-3", name: "Boljebeder", price: 25, emoji: "🍠", index: 3 },
  { id: "veg-4", name: "Broccoli", price: 25, emoji: "🥦", index: 4 },
  { id: "veg-5", name: "Chili", price: 20, emoji: "🌶️", index: 5 },
  { id: "veg-6", name: "Glaskål", price: 20, emoji: "🥬", index: 6 },
  { id: "veg-7", name: "Gulerød\n(5 stk)", price: 20, emoji: "🥕", index: 7 },
  { id: "veg-8", name: "Hvidkål", price: 25, emoji: "🥬", index: 8 },
  { id: "veg-9", name: "Hvidløg", price: 15, emoji: "🧄", index: 9 },
  { id: "veg-10", name: "Kartofler\nalm.", price: 25, emoji: "🥔", index: 10 },
  { id: "veg-11", name: "Kartofler\nrød", price: 25, emoji: "🥔", index: 11 },
  { id: "veg-12", name: "Løg Gul", price: 20, emoji: "🧅", index: 12 },
  { id: "veg-13", name: "Løg Rød", price: 20, emoji: "🧅", index: 13 },
  { id: "veg-14", name: "Marktomater", price: 25, emoji: "🍅", index: 14 },
  { id: "veg-15", name: "Palmekål", price: 30, emoji: "🌿", index: 15 },
  { id: "veg-16", name: "Peber", price: 25, emoji: "🫑", index: 16 },
  { id: "veg-17", name: "Persille", price: 20, emoji: "🌿", index: 17 },
  { id: "veg-18", name: "Porre", price: 10, emoji: "🧅", index: 18 },
  { id: "veg-19", name: "Regnbue\nBladebeder", price: 30, emoji: "🌈", index: 19 },
  { id: "veg-20", name: "Rød Grønkål", price: 30, emoji: "🥬", index: 20 },
  { id: "veg-21", name: "Rød Spidskål", price: 30, emoji: "🥬", index: 21 },
  { id: "veg-22", name: "Rødbeder\n(3 stk)", price: 25, emoji: "🍠", index: 22 },
  { id: "veg-23", name: "Rødkål", price: 30, emoji: "🥬", index: 23 },
  { id: "veg-24", name: "Savoy", price: 25, emoji: "🥬", index: 24 },
  { id: "veg-25", name: "Tomater", price: 25, emoji: "🍅", index: 25 },
];
