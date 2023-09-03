import { get, post } from "@/api";

export const listRepositoryBranches = async (
  id: string,
  params?: { search?: string },
) => {
  return get(`/projects/${id}/repository/branches`, params);
};

interface MergeRequestRes {
  web_url: string;
  user: { can_merge: boolean };
  id: number;
  iid: number;
}
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
): Promise<MergeRequestRes> => {
  return post(`/projects/${id}/merge_requests`, params);
};
