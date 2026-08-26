import { refreshAccessToken } from "@/core/actions/auth";

export interface RequestGetOptions {
  token?: string;
  cache?: any;
  headers?: any;
  _isRetry?: boolean;
}

const requestFetch = async (
  formData: object,
  url: string,
  method: string,
  options: RequestGetOptions = {},
) => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.token && { Authorization: `Bearer ${options.token}` }),
    };

    let response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(formData),
    });

    if (response.status === 401 && !options._isRetry) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        headers["Authorization"] = `Bearer ${newToken}`;
        response = await fetch(url, {
          method,
          headers,
          body: JSON.stringify(formData),
        });
      } else {
        window.location.href = "/";
        return { error: true, message: "Sesión expirada" };
      }
    }

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: data.message };
    }

    return data;
  } catch (error) {
    console.error("Error al hacer la petición:", error);
  }
};

export default requestFetch;
