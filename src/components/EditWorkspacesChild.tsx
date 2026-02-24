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
  index,
  deleteWorkspace,
  updateName,
}: {
  workspace: Workspace;
  workspaces: Workspace[];
  index: number;
  deleteWorkspace: (x: string) => void;
  updateName: (workspace: string, value: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li
      className="flex justify-between gap-4"
      style={{ color: workspace.color }}
      id={`${index}`}
    >
      <div className="flex gap-2 items-center">
        <BsThreeDotsVertical className="cursor-pointer" />
        {isEditing ? (
          <input
            className="modal__input"
            type="text"
            value={workspace.name}
            id={workspace.id}
            style={{ borderColor: workspace.color }}
            onChange={(e) => updateName(workspace.id, e.target.value)}
          />
        ) : (
          <p>{workspace.name}</p>
        )}
      </div>
      {isEditing ? (
        <div className="flex gap-4">
          <button
            onClick={() => setIsEditing(false)}
            className="modal__button text-black!"
            style={{ backgroundColor: workspace.color }}
          >
            <BsFloppy2Fill />
          </button>
          {workspaces.length > 1 && (
            <button
              onClick={() => deleteWorkspace(workspace.id)}
              className="modal__button text-black!"
              style={{ backgroundColor: workspace.color }}
            >
              <BsTrash3Fill />
            </button>
          )}
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
