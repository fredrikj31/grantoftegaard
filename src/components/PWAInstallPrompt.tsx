import { Share } from "lucide-react";
import { Button } from "@shadcn-ui/components/ui/button";
import {
  DialogRoot,
  DialogPortal,
  DialogBackdrop,
  DialogViewport,
  DialogPopup,
  DialogTitle,
  DialogDescription,
} from "@shadcn-ui/components/ui/dialog";
import { usePWAInstall } from "../providers/PWAInstall";

export function PWAInstallPrompt() {
  const { isIOS, isPromptOpen, promptInstall, dismissPrompt } = usePWAInstall();

  return (
    <DialogRoot open={isPromptOpen} onOpenChange={(isOpen) => !isOpen && dismissPrompt()}>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup>
            <DialogTitle className="text-xl font-bold mb-2">Installer appen</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mb-6">
              {isIOS ? (
                <>
                  Tryk på del-ikonet <Share className="inline h-4 w-4 align-text-bottom" /> i Safari, og vælg
                  derefter &quot;Føj til hjemmeskærm&quot;.
                </>
              ) : (
                "Installer denne app på din enhed for hurtig adgang."
              )}
            </DialogDescription>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={dismissPrompt}>
                {isIOS ? "Forstået" : "Ikke nu"}
              </Button>
              {!isIOS && <Button onClick={promptInstall}>Installer</Button>}
            </div>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </DialogRoot>
  );
}
