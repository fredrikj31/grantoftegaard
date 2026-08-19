import { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router";
import { useCart } from "../../../providers/Cart";
import { Button } from "@shadcn-ui/components/ui/button";
import { PaymentDialog, type PaymentMethod } from "./PaymentDialog";

export const CartItems = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();
  const navigate = useNavigate();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const handlePaymentConfirmed = (paymentMethod: PaymentMethod) => {
    window.umami?.track("checkout-cart", {
      items: items.flatMap(({ name, quantity }) => Array(quantity).fill(name)),
      revenue: totalPrice,
      currency: "DKK",
      paymentMethod,
    });
    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-lg text-muted-foreground">Kurven er tom</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="text-2xl">{item.emoji}</div>
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.price} kr each</p>
              </div>
              <p className="font-bold text-lg">{item.price * item.quantity} kr</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1" />

      <div className="rounded-lg border-t-2 border-border bg-card p-4">
        <div className="mb-4 flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>{totalPrice} kr</span>
        </div>
        <div className="flex flex-row gap-2 overflow-hidden ">
          <Button onClick={clearCart} variant="destructive" className="flex-1 h-16">
            Tøm Kurv
          </Button>
          <Button onClick={() => setIsPaymentDialogOpen(true)} className="flex-1 h-16">
            Køb
          </Button>
        </div>
      </div>

      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        items={items}
        totalPrice={totalPrice}
        onClose={() => setIsPaymentDialogOpen(false)}
        onPaymentConfirmed={handlePaymentConfirmed}
      />
    </div>
  );
};
