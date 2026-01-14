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
  function deleteWorkspace(workspaceId: string) {
    const updatedWorkspaces = workspaces.filter(
      (workspace) => workspaceId !== workspace.id
    );
    if (workspaceId == selectedWorkspace) {
      setSelectedWorkspace("all");
    }
    setWorkspaces(updatedWorkspaces);
  }

  // for testing the migration of workspace.name to workspace.id

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
              setWorkspaces={(x: Workspace[]) => setWorkspaces(x)}
              key={workspace.id}
              index={index}
              deleteWorkspace={deleteWorkspace}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
