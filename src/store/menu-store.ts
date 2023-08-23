import { create } from "zustand";
import { getMenu } from "../server-side/api";
interface IMenuStore {
  isFetching?: boolean;
  onFetchMenu: () => void;
  menu: Menu[] | null;
}

export const useMenuStore = create<IMenuStore>((set) => {
  return {
    menu: [],
    isFetching: true,
    onFetchMenu: () => {
      getMenu()
        .then((result) => {
          set({
            menu: result,
          });
        })
        .catch(console.error)
        .finally(() => set({ isFetching: false }));
    },
  };
});
