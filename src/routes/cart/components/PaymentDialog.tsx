import { useEffect, useState } from "react";
import { Banknote, Smartphone } from "lucide-react";
import QRCode from "qrcode";
import { Button } from "@shadcn-ui/components/ui/button";
import type { CartItem } from "../../../providers/Cart";
import {
  DialogRoot,
  DialogPortal,
  DialogBackdrop,
  DialogViewport,
  DialogPopup,
  DialogTitle,
} from "@shadcn-ui/components/ui/dialog";

const MOBILEPAY_PHONE = import.meta.env.VITE_MOBILEPAY_PHONE;

export type PaymentMethod = "cash" | "mobilepay";

interface PaymentDialogProps {
  isOpen: boolean;
  items: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onPaymentConfirmed: (paymentMethod: PaymentMethod) => void;
}

function buildMobilePayLink(items: CartItem[], totalPrice: number) {
  const comment = items
    .map((item) => `${item.quantity}x ${item.name}`)
    .join("\n");

  const params = new URLSearchParams({
    phone: MOBILEPAY_PHONE,
    amount: totalPrice.toFixed(2),
    comment,
  });

  return `https://qr.mobilepay.dk/paymentlink?${params.toString()}`;
}

export function PaymentDialog({
  isOpen,
  items,
  totalPrice,
  onClose,
  onPaymentConfirmed,
}: PaymentDialogProps) {
  const [step, setStep] = useState<"choose" | "mobilepay-qr">("choose");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    if (step !== "mobilepay-qr") return;
    const link = buildMobilePayLink(items, totalPrice);
    QRCode.toDataURL(link, { width: 256 }).then(setQrCodeUrl);
  }, [step, items, totalPrice]);

  const handleClose = () => {
    setStep("choose");
    setQrCodeUrl("");
    onClose();
  };

  const handleCash = () => {
    onPaymentConfirmed("cash");
    handleClose();
  };

  const handleMobilePayDone = () => {
    onPaymentConfirmed("mobilepay");
    handleClose();
  };

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup>
            <DialogTitle className="text-xl font-bold mb-4">
              {step === "choose" ? "Betalingsmetode" : "MobilePay"}
            </DialogTitle>

            {step === "choose" ? (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">
                  Hvordan betaler kunden?
                </p>
                <Button
                  onClick={handleCash}
                  size="lg"
                  className="w-full justify-start gap-3"
                >
                  <Banknote className="h-5 w-5" />
                  Kontant
                </Button>
                <Button
                  onClick={() => setStep("mobilepay-qr")}
                  size="lg"
                  variant="secondary"
                  className="w-full justify-start gap-3"
                >
                  <Smartphone className="h-5 w-5" />
                  MobilePay
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm text-muted-foreground text-center">
                  Lad kunden scanne QR-koden for at betale
                </p>
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="MobilePay QR-kode"
                    className="h-56 w-56 rounded-lg border border-border"
                  />
                ) : (
                  <div className="h-56 w-56 rounded-lg border border-border bg-muted animate-pulse" />
                )}
                <Button onClick={handleMobilePayDone} className="w-full">
                  Luk
                </Button>
              </div>
            )}
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </DialogRoot>
  );
}
