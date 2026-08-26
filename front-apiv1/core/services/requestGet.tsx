import { refreshAccessToken } from "@/core/actions/auth";

export interface RequestGetOptions {
  token?: string;
  cache?: any;
  headers?: any;
  _isRetry?: boolean;
}

const requestGet = async (url: string, options: RequestGetOptions = {}) => {
  try {
    const headers: Record<string, string> = {
      ...(options.token && { Authorization: `Bearer ${options.token}` }),
    };

    const typeFetch = { cache: options.cache || "no-store" };

    let response = await fetch(url, { ...options, ...typeFetch, headers });

    if (response.status === 401 && !options._isRetry) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        headers["Authorization"] = `Bearer ${newToken}`;
        response = await fetch(url, { ...options, ...typeFetch, headers });
      } else {
        window.location.href = "/";
        return { error: true, message: "Sesión expirada" };
      }
    }

    if (!response.ok) {
      return await response.json();
    }
    return await response.json();
  } catch (error) {
    console.error("Error del servidor ", error);
  }
};

export default requestGet;
