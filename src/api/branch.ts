import { get, post } from "@/api";

export const listRepositoryBranches = async (
  id: string,
  params?: { search?: string }
) => {
  return get(`/projects/${id}/repository/branches`, params);
};

export const createRepositoryBranch = async (
  id: string,
  params: {
    id: string;
    branch: string;
    /** Branch name or commit SHA to create branch from. */
    ref: string;
  }
) => {
  return post(`/projects/${id}/repository/branches`, params);
};

interface MergeRequestRes {
  web_url: string;
  user: { can_merge: boolean };
  id: string;
  iid: number;
}
export const createMergeRequest = async (
  id: string,
  params: {
    source_branch: string;
    target_branch: string;
    title: string;
    description?: string;
    assignee_id?: number;
    assignee_ids?: number[];
  }
): Promise<MergeRequestRes> => {
  return post(`/projects/${id}/merge_requests`, params);
};
