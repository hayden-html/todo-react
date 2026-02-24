"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import "../../styles/layout.scss";
import type { Workspace } from "../../types";

import {
  MdAdd,
  MdOutlineWork,
  MdShoppingCart,
  MdAudiotrack,
  MdHome,
  MdOutlinePets,
  MdRocketLaunch,
  MdSportsEsports,
  MdEdit,
} from "react-icons/md";
import { workspaceIcons } from "../../utils/iconLibrary";

export default function Sidebar({
  setIsNewWorkspaceModal,
  setIsEditWorkspaceModal,
  workspaces,
  selectedWorkspace,
  setSelectedWorkspace,
}: {
  setIsNewWorkspaceModal: (x: boolean) => void;
  setIsEditWorkspaceModal: (x: boolean) => void;
  workspaces: Workspace[];
  selectedWorkspace: string;
  setSelectedWorkspace: (x: string) => void;
}) {
  const selectedWorkspaceData = workspaces.find(
    (workspace) => workspace.id == selectedWorkspace,
  );

  return (
    <nav
      className="p-4 border-r-2 grid grid-cols-1 items-center max-h-screen min-w-fit"
      style={{
        borderColor:
          selectedWorkspace == "all"
            ? "var(--all-color)"
            : selectedWorkspaceData?.color,
      }}
    >
      <div className="flex flex-col gap-4">
        <fieldset
          className="workspace__list flex flex-col gap-4"
          name="workspace"
        >
          {workspaces.length > 1 && (
            <label
              className={`workspace__option`}
              style={{
                borderColor: "var(--all-color)",
                ...(selectedWorkspace === "all"
                  ? { backgroundColor: "var(--all-color)", color: "rgb(0 0 0)" }
                  : { color: "var(--all-color)" }),
              }}
            >
              <input
                type="radio"
                value="all"
                name="workspace"
                id="all"
                checked={selectedWorkspace === "all"}
                onChange={() => setSelectedWorkspace("all")}
              ></input>
              All
            </label>
          )}
          {workspaces.map((workspace: Workspace, index: number) => {
            const iconData = workspaceIcons.find(
              (icon) => icon.id === workspace.icon,
            );
            const IconComponent = iconData?.component;
            return (
              <label
                className={`workspace__option`}
                htmlFor={"workspace-options-" + workspace.id}
                style={{
                  borderColor: workspace.color,
                  ...(selectedWorkspace == workspace.id
                    ? { backgroundColor: workspace.color, color: "rgb(0 0 0)" }
                    : { color: workspace.color }),
                }}
                key={index}
              >
                {IconComponent && (
                  <IconComponent
                    className="mx-auto"
                    style={{
                      fontSize: workspaceIcons.find(
                        (icon) => icon.id === workspace.icon,
                      )?.size,
                    }}
                  />
                )}
                <input
                  type="radio"
                  id={"workspace-options-" + workspace.id}
                  value={workspace.id}
                  className=""
                  name="workspace"
                  checked={selectedWorkspace === workspace.id}
                  onChange={(e) => setSelectedWorkspace(e.target.value)}
                ></input>
              </label>
            );
          })}
        </fieldset>
        <button
          className="workspace__create text-center"
          onClick={() => setIsNewWorkspaceModal(true)}
          style={{
            color:
              selectedWorkspace === "all"
                ? "var(--all-color)"
                : workspaces.find(
                    (workspace) => workspace.id === selectedWorkspace,
                  )?.color,
          }}
        >
          <MdAdd className="mx-auto text-2xl -mt-1"></MdAdd>
        </button>
        <button
          onClick={() => setIsEditWorkspaceModal(true)}
          className="workspace__create text-center"
          style={{
            color:
              selectedWorkspace === "all"
                ? "var(--all-color)"
                : workspaces.find(
                    (workspace) => workspace.id === selectedWorkspace,
                  )?.color,
          }}
        >
          <MdEdit className="mx-auto text-2xl -mt-1 " />
        </button>
      </div>
    </nav>
  );
}
