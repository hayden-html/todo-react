export type Note = {
  id: string;
  createdAt: string;
  noteBody: string;
  workspaceName: string;
  height: string;
  width: string;
};

export type Workspace = {
  id: string;
  name: string;
  color: string;
  icon: string;
};
