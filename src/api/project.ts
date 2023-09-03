import { get, post } from "@/api";

interface ProjectReq {
  starred?: boolean;
  search?: string;
  order_by?:
    | "id"
    | "name"
    | "path"
    | "created_at"
    | "updated_at"
    | "last_activity_at";
}
export const listAllProjects = async (params?: ProjectReq) => {
  return get("/projects", params);
};
