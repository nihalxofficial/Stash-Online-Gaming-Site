"use server";

import { redirect } from "next/navigation";
import { getToken } from "./session";

const Api = process.env.NEXT_PUBLIC_API_URL;

// Helper to handle standardized Next.js responses securely
const handleResponse = async (res: Response): Promise<unknown> => {
    if (res.status === 401) redirect("/auth/login");
    if (res.status === 403) redirect("/unauthorized");

    const data = await res.json();
    return data;
};

export const serverFetch = async (path: string, requireAuth: boolean = false): Promise<unknown> => {
    const headers: Record<string, string> = {};

    if (requireAuth) {
        const token = await getToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    const res = await fetch(`${Api}${path}`, {
        cache: "no-store",
        headers,
    });

    return handleResponse(res);
};

export const serverMutation = async (
    path: string,
    data: unknown = "",
    method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST"
): Promise<unknown> => {
    const token = await getToken();

    try {
        const res = await fetch(`${Api}${path}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: data ? JSON.stringify(data) : undefined,
        });

        return handleResponse(res);
    } catch (err: any) {
        console.error("fetch failed:", err.message);
        throw err;
    }
};