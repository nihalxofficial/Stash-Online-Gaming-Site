// src/lib/api/games.ts
import { serverFetch } from "../core/server";

// FIXED: Explicitly added ': Promise<any>' signature so TypeScript stops inferring '{}' from serverFetch
export const getGames = async (
  searchParams?: Record<string, string | string[] | undefined>
): Promise<any> => {
  const query = new URLSearchParams();

  if (searchParams) {
    if (searchParams.q) query.append("q", String(searchParams.q));
    if (searchParams.genre && searchParams.genre !== "All") query.append("genre", String(searchParams.genre));
    if (searchParams.sortBy && searchParams.sortBy !== "default") query.append("sortBy", String(searchParams.sortBy));
    
    // Append routing vector coordinates
    if (searchParams.page) query.append("page", String(searchParams.page));
    if (searchParams.limit) query.append("limit", String(searchParams.limit));
  }

  return serverFetch(`/games?${query.toString()}`);
};

// FIXED: Explicitly added ': Promise<any>' signature
export const getGameById = async (id: string): Promise<any> => {
  return serverFetch(`/games/${id}`);
};

// FIXED: Explicitly added ': Promise<any>' signature
export const getGamesByOwner = async (id: string): Promise<any> => {
  return serverFetch(`/games?owner=${id}`);
};