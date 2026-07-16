import { serverMutation } from "../core/server";

// FIXED: Added explicit ': Promise<any>' signature to prevent TypeScript 
// from inferring an empty object '{}' return type from serverMutation
export const addGame = async (data: unknown): Promise<any> => {
  return serverMutation(`/games`, data);
};