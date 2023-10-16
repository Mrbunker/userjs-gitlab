import { get, post } from "@/api";

export const listUser = async (params?: { username: string }) => {
  return get("/users", params);
};
