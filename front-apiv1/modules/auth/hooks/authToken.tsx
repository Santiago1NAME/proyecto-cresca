import { create } from "zustand";
import { saveToken, clearToken, getTokenPayload } from "@/core/actions/auth";

interface TokenState {
  roles: string[];
  user: string;
  hydrated: boolean;
  setToken: (token: string) => Promise<void>;
  clearToken: () => Promise<void>;
  hydrate: () => Promise<void>;
}

const useTokenStore = create<TokenState>()((set) => ({
  roles: [],
  user: "",
  hydrated: false,

  setToken: async (token: string) => {
    const { roles, user } = await saveToken(token);
    set({ roles, user });
  },

  clearToken: async () => {
    await clearToken();
    set({ roles: [], user: "", hydrated: false });
  },

  hydrate: async () => {
    const payload = await getTokenPayload();
    if (payload) {
      set({ ...payload, hydrated: true });
    } else {
      set({ hydrated: true });
    }
  },
}));

export { useTokenStore };