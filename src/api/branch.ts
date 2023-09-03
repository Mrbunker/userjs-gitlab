import { get, post } from "@/api";

export const listRepositoryBranches = async (
  id: string,
  params?: { search?: string },
) => {
  return get(`/projects/${id}/repository/branches`, params);
};

export const createMergeRequest = async (
  id: string,
  params: {
    source_branch: string;
    target_branch: string;
    title: string;
    description?: string;
    assignee_id?: string;
    assignee_ids?: string[];
  },
) => {
  return post(`/projects/${id}/merge_requests`, params);
};
