import { Download } from "lucide-react";
import { Button } from "@shadcn-ui/components/ui/button";
import { usePWAInstall } from "../providers/PWAInstall";

export const PWAInstallButton = () => {
  const { canInstall, isIOS, isStandalone, openPrompt } = usePWAInstall();

  if ((!canInstall && !isIOS) || isStandalone) return null;

  return (
    <Button variant="outline" size="icon" aria-label="Installer app" onClick={openPrompt}>
      <Download className="h-5 w-5" />
    </Button>
  );
};
