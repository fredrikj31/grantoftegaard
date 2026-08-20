/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_MOBILEPAY_PHONE_VEGETABLES: string;
  readonly VITE_MOBILEPAY_PHONE_FOOD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  umami?: {
    track: (eventName: string, data?: Record<string, unknown>) => void;
  };
}
