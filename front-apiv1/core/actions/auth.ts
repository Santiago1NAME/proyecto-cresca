"use server"

import { cookies } from "next/headers";
import getJWT from "@/core/services/getJWT";

export async function saveToken(token: string) {
  const payload = getJWT(token) as any;

  (await cookies()).set("token", token, {
    httpOnly: true,   // 🔒 JS no puede leerla
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60, // 7 días en segundos
    path: "/",
  });

  // Los roles sí pueden ir en el store cliente (no son sensibles)
  return payload?.roles || [];
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

export async function getToken(){
  const token = (await cookies()).get("token")?.value;
  return token || null;
}