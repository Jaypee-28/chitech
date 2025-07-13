import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item) => {
        const existing = get().items.find(
          (i) => i.productId === item.productId
        );

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        });
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "user-cart-storage",
    }
  )
);

// ✅ Dynamic derived state
export const useCartItemCount = () =>
  useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

export const useCartTotalAmount = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
