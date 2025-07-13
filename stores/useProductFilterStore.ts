// stores/useProductFilterStore.ts
import { create } from "zustand";

interface ProductFilterState {
  selectedCategory: string | null;
  selectedBrands: string[];
  priceRange: [number, number];
  searchQuery: string;
  setCategory: (category: string | null) => void;
  toggleBrand: (brand: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useProductFilterStore = create<ProductFilterState>((set) => ({
  selectedCategory: null,
  selectedBrands: [],
  priceRange: [0, 10000000],
  searchQuery: "",
  setCategory: (category) => set({ selectedCategory: category }),
  toggleBrand: (brand) =>
    set((state) => {
      const isSelected = state.selectedBrands.includes(brand);
      return {
        selectedBrands: isSelected ? [] : [brand],
      };
    }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetFilters: () =>
    set({
      selectedCategory: null,
      selectedBrands: [],
      priceRange: [0, 10000],
      searchQuery: "",
    }),
}));
