export type Pagination = {
  page?: number;
  per_page?: number;
};

export type Branchs = {
  can_push: boolean;
  name: string;
  commit: { id: string; message: string; title: string };
}[];

export type Projects = {
  archived: boolean;
  id: number;
  name: string;
  name_with_namespace: string;
  web_url: string;
  path: string;
  path_with_namespace: string;
}[];

declare global {
  interface Window {
    vue_mr_dialog: HTMLDialogElement;
    vue_cb_dialog: HTMLDialogElement;
  }
}

type PushData = {
  commit_count: number;
  action: "pushed" | string;
  ref_type: string;
  commit_from: string;
  commit_to: string;
  ref: string;
  commit_title: string;
};

export type Event = {
  title: string;
  project_id: number;
  action_name: string;
  arget_id: number;
  arget_type: string;
  author_id: number;
  target_title: string;
  author: {
    name: string;
    username: string;
    id: number;
    state: string;
    avatar_url: string;
    web_url: string;
  };
  author_username: string;
  push_data?: PushData;
};
