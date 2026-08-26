"use server"

import { cookies } from "next/headers";
import getJWT from "@/core/services/getJWT";

export async function saveToken(accessToken: string, refreshToken?: string) {
  const payload = getJWT(accessToken) as any;

  (await cookies()).set("token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 15, // 15 minutos
    path: "/",
  });

  if (refreshToken) {
    (await cookies()).set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });
  }

  return payload?.roles || [];
}

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = (await cookies()).get("refresh_token")?.value;
  if (!refreshToken) return null;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${apiUrl}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const newAccessToken = data.data?.access_token;
    const newRefreshToken = data.data?.refresh_token;

    if (newAccessToken) {
      (await cookies()).set("token", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 15,
        path: "/",
      });
    }
    if (newRefreshToken) {
      (await cookies()).set("refresh_token", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }

    return newAccessToken;
  } catch {
    return null;
  }
}

export async function clearAllTokens() {
  (await cookies()).delete("token");
  (await cookies()).delete("refresh_token");
}

export async function clearToken() {
  (await cookies()).delete("token");
}

export async function getTokenPayload() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  const payload = getJWT(token) as any;
  if (!payload) return null;

  return {
    roles: payload.roles || [],
    user: payload.sub || "",
  };
}

export async function getToken() {
  const token = (await cookies()).get("token")?.value;
  return token || null;
}
