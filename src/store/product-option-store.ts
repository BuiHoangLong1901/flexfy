import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ProductOptionStore = {
  sizes?: Size[];
  colors?: Color[];
  categories?: Menu[];
  menu?: Menu[];
  footer?: Footer[];
  addOption?: (name: string, data: unknown) => void;
};
export const useProductOptionStore = create<ProductOptionStore>()(
  persist(
    (set, get) => ({
      sizes: [],
      colors: [],
      categories: [],
      menu: [],
      footer: [],
      addOption: (name, data) => set({ [name]: data }),
    }),
    {
      name: "product-option",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
