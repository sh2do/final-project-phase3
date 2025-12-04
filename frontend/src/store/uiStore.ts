import { create } from 'zustand';

interface UiState {
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isLoading: false,
  error: null,
  setLoading: (loading) => set((state) => ({ isLoading: loading })),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
