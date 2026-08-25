/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

export interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

interface PWAInstallContextType {
  canInstall: boolean;
  isStandalone: boolean;
  isIOS: boolean;
  isPromptOpen: boolean;
  promptInstall: () => Promise<"accepted" | "dismissed" | undefined>;
  openPrompt: () => void;
  dismissPrompt: () => void;
}

const PWAInstallContext = createContext<PWAInstallContextType | undefined>(undefined);

const DISMISSED_COOKIE = "pwa-install-dismissed";

function isDismissedCookie(): boolean {
  return document.cookie.split("; ").some((c) => c.startsWith(`${DISMISSED_COOKIE}=`));
}

function setDismissedCookie() {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${DISMISSED_COOKIE}=1; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function isStandaloneDisplayMode(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && (navigator as { standalone: boolean }).standalone)
  );
}

function isIOSDevice(): boolean {
  return (
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function PWAInstallProvider({ children }: { children: React.ReactNode }) {
  const installPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isStandalone, setIsStandalone] = useState(isStandaloneDisplayMode);
  const [isIOS] = useState(isIOSDevice);
  const [dismissed, setDismissed] = useState(isDismissedCookie);
  const [forcedOpen, setForcedOpen] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      installPrompt.current = e as BeforeInstallPromptEvent;
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      installPrompt.current = null;
      setCanInstall(false);
      setIsStandalone(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!installPrompt.current) return undefined;

    await installPrompt.current.prompt();
    const { outcome } = await installPrompt.current.userChoice;

    installPrompt.current = null;
    setCanInstall(false);
    setForcedOpen(false);
    if (outcome === "dismissed") {
      setDismissedCookie();
      setDismissed(true);
    }

    return outcome;
  };

  const openPrompt = () => setForcedOpen(true);

  const dismissPrompt = () => {
    setDismissedCookie();
    setDismissed(true);
    setForcedOpen(false);
  };

  const canShowInstallUI = (canInstall || isIOS) && !isStandalone;
  const isPromptOpen = canShowInstallUI && (forcedOpen || !dismissed);

  return (
    <PWAInstallContext.Provider
      value={{ canInstall, isStandalone, isIOS, isPromptOpen, promptInstall, openPrompt, dismissPrompt }}
    >
      {children}
    </PWAInstallContext.Provider>
  );
}

export function usePWAInstall() {
  const context = useContext(PWAInstallContext);
  if (context === undefined) {
    throw new Error("usePWAInstall must be used within a PWAInstallProvider");
  }
  return context;
}
