import { useState } from "react";
import {
  BsFloppy2Fill,
  BsPencilFill,
  BsThreeDotsVertical,
  BsTrash3Fill,
} from "react-icons/bs";
import type { Workspace } from "../types";
// import CreateWorkspaceModal from "./CreateWorkspaceModal";

export default function EditWorkspaceChild({
  workspace,
  workspaces,
  setWorkspaces,
  index,
}: {
  workspace: Workspace;
  workspaces: Workspace[];
  setWorkspaces: (x: Workspace[]) => void;
  index: number;
}) {
  const [isEditing, setIsEditing] = useState(false);

  function deleteWorkspace(workspaceId: string) {
    const updatedWorkspaces = workspaces.filter(
      (workspace) => workspaceId !== workspace.id
    );
    setWorkspaces(updatedWorkspaces);
  }
  return (
    <li
      className="flex justify-between gap-4"
      style={{ color: workspace.color }}
      key={index}
    >
      <div className="flex gap-2 items-center">
        <BsThreeDotsVertical className="cursor-pointer" />
        {isEditing ? (
          <input
            className="modal__input"
            type="text"
            value={workspace.name}
            style={{ borderColor: workspace.color }}
          />
        ) : (
          <p>{workspace.name}</p>
        )}
      </div>
      {isEditing ? (
        <div className="flex gap-4">
          <button
            onClick={() => setIsEditing(true)}
            className="modal__button text-black!"
            style={{ backgroundColor: workspace.color }}
          >
            <BsFloppy2Fill />
          </button>
          <button
            onClick={() => deleteWorkspace(workspace.id)}
            className="modal__button text-black!"
            style={{ backgroundColor: workspace.color }}
          >
            <BsTrash3Fill />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="modal__button text-black!"
          style={{ backgroundColor: workspace.color }}
        >
          <BsPencilFill />
        </button>
      )}
      {/* {isEditing && (
        <CreateWorkspaceModal
          setIsNewWorkspaceModal={setIsEditing}
        />
      )} */}
    </li>
  );
}
