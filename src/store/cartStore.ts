import { create } from 'zustand'

const useCartStore = create((set) => ({
  items: [],
  addToCart: (product: any) =>
    set((state: any) => ({ items: [...state.items, product] })),
  removeFromCart: (productId: any) =>
    set((state: any) => ({
      items: state.items.filter((item: any) => item.id !== productId),
    })),
}))

export default useCartStore
