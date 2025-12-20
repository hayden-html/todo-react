export type Note = {
  id: string;
  createdAt: string;
  noteBody: string;
  workspaceId: string;
};

export type Workspace = {
  id: string;
  name: string;
  color: string;
  icon: string;
};
