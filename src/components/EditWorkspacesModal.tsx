// Todo - deleting a workspace should also delete the notes that correspond to it

import { BsX } from "react-icons/bs";
import type { Workspace } from "../types";
import EditWorkspacesChild from "./EditWorkspacesChild";

export default function EditWorkspacesModal({
  setIsEditWorkspaceModal,
  workspaces,
  setWorkspaces,
  selectedWorkspace,
  setSelectedWorkspace,
}: {
  setIsEditWorkspaceModal: (x: boolean) => void;
  workspaces: Workspace[];
  setWorkspaces: (x: Workspace[]) => void;
  selectedWorkspace: string;
  setSelectedWorkspace: (x: string) => void;
}) {
  function deleteWorkspace(workspace: string) {
    const updatedWorkspaces = workspaces.filter(
      (workspace) => workspace !== workspace.id,
    );
    if (workspace == selectedWorkspace) {
      setSelectedWorkspace(workspaces.length > 0 ? workspaces[0].id : "all");
    }
    setWorkspaces(updatedWorkspaces);
  }

  function updateName(workspace: string, value: string) {
    const newWorkspace = workspaces.map((x: Workspace) =>
      x.id == workspace ? { ...x, name: value } : x,
    );
    setWorkspaces(newWorkspace);
  }
  return (
    <div className="modal-background">
      <div className="dashboard__modal text-white">
        <div className="flex justify-between gap-8">
          <h2 className="modal__heading" style={{ color: "white" }}>
            Edit Workspaces
          </h2>
          <button
            onClick={() => setIsEditWorkspaceModal(false)}
            className="text-white text-2xl -mt-2"
            style={{ color: "white" }}
          >
            <BsX className="text-[2.5rem]"></BsX>
          </button>
        </div>
        <ul className="flex flex-col gap-4">
          {workspaces.map((workspace, index) => (
            <EditWorkspacesChild
              workspace={workspace}
              workspaces={workspaces}
              key={workspace.id}
              index={index}
              deleteWorkspace={deleteWorkspace}
              updateName={updateName}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
