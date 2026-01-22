export type Note = {
  id: string;
  createdAt: string;
  noteTitle: string;
  noteBody: string;
  workspaceId: string;
  height: string;
  width: string;
};

export type Workspace = {
  id: string;
  name: string;
  color: string;
  icon: string;
};
