import { StoreApi, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
  key: string;
  name?: string;
  thumbnail?: string;
  price: number;
  slug?: string;
  originalPrice?: number;
  option?: { size: string; color: string };
  quantity: number;
}

export type Cart = {
  items: CartItem[];
  totalPrice: number;
};
interface ICartStore {
  cart: Cart;
  isShowModal?: boolean;
  showModal: (isShow: boolean) => void;
  onAddToCart: (
    item: Product | ProductDetail | BaseProduct,
    quantity: number,
    option: { size: string; color: string }
  ) => void;
  onRemoveToCart: (item: { key: string; price: number }) => void;
  onUpdateQuantity: (item: {
    key: string;
    price: number;
    quantity: number;
  }) => void;
}

function updateCartItems(
  item: CartItem,
  get: StoreApi<ICartStore>["getState"],
  set: StoreApi<ICartStore>["setState"],
  isNew?: boolean
) {
  const { cart } = get();
  const existingCartItem = cart.items.find(
    (cartItem) => cartItem.key === item.key
  );
  if (existingCartItem) {
    const newQuantity = isNew
      ? item.quantity
      : item.quantity - existingCartItem.quantity;
    existingCartItem.quantity += newQuantity;
    if (existingCartItem.quantity === 0) {
      cart.items = cart.items.filter((cartItem) => cartItem.key !== item.key);
    }
  } else if (item.quantity > 0) {
    cart.items.unshift({ ...item });
  }
  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  set({ cart: { ...cart } });
}

export const useCartStore = create<ICartStore>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        totalPrice: 0,
      },
      showModal: (isShow: boolean) =>
        set({
          isShowModal: isShow,
        }),
      onAddToCart: (product, quantity, option) => {
        const key = `${product.id}-${option.size}-${option.color}`;
        const item = {
          key,
          name: product.name,
          thumbnail: product.thumbnail,
          price: product.price,
          slug: product.slug,
          originalPrice: product.originalPrice,
          option,
          quantity,
        };
        updateCartItems(item, get, set, true);
      },
      onRemoveToCart: (item) => {
        updateCartItems({ ...item, quantity: 0 }, get, set);
      },
      onUpdateQuantity: (item) => {
        updateCartItems(item, get, set);
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: { ...state.cart },
      }),
    }
  )
);
