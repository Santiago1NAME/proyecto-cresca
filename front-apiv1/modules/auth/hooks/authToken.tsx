import { create } from "zustand";
import { saveToken, clearAllTokens, getTokenPayload } from "@/core/actions/auth";

interface TokenState {
  roles: string[];
  user: string;
  hydrated: boolean;
  setToken: (accessToken: string, refreshToken?: string) => Promise<void>;
  clearToken: () => Promise<void>;
  hydrate: () => Promise<void>;
}

const useTokenStore = create<TokenState>()((set) => ({
  roles: [],
  user: "",
  hydrated: false,

  setToken: async (accessToken: string, refreshToken?: string) => {
    const { roles, user } = await saveToken(accessToken, refreshToken);
    set({ roles, user });
  },

  clearToken: async () => {
    await clearAllTokens();
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
