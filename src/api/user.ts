import { get, post } from "@/api";
import { Event, Pagination } from "@/types/index";

type actionTypes =
  | "created"
  | "updated"
  | "closed"
  | "reopened"
  | "pushed"
  | "commented"
  | "merged"
  | "joined"
  | "left"
  | "destroyed"
  | "expired";

export const listUser = async (params?: { username: string }) => {
  return get("/users", params);
};

export const getUserEvents = async (
  id: string,
  params?: {
    /** Include only events of a particular action type */
    action?: actionTypes;
    target_type?: string;
    sort?: "asc " | "desc";
  } & Pagination
): Promise<Event[]> => {
  return get(`/users/${id}/events`, params);
};
