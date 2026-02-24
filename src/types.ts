export type Note = {
  id: string;
  createdAt: string;
  title: string;
  body: string;
  workspace: string;
  height: string;
  width: string;
};

export type Workspace = {
  id: string;
  name: string;
  color: string;
  icon: string;
};
