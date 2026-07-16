import { serverFetch } from "../core/server";

export const getDownloads= async (userId:any): Promise<any> => {
  return serverFetch(`/download-history?userId=${userId}`, true);
};