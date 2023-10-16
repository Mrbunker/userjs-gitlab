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
