/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, type ChangeEvent } from "react";
import type { Workspace } from "../types";
import { workspaceIcons } from "../utils/iconLibrary";

import {
  MdAudiotrack,
  MdHome,
  MdOutlinePets,
  MdOutlineWork,
  MdRocketLaunch,
  MdShoppingCart,
  MdSportsEsports,
} from "react-icons/md";

export default function CreateWorkspaceModal({
  setIsNewWorkspaceModal,
  setWorkspaces,
  setSelectedWorkspace,
}: {
  setIsNewWorkspaceModal: (x: boolean) => void;
  setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>;
  setSelectedWorkspace: (x: string) => void;
}) {
  const [newWorkspace, setNewWorkspace] = useState<Workspace>({
    id: "",
    name: "",
    color: "rgb(250, 204, 21)",
    icon: "home",
  });
  const addNewWorkspace = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const workspace: Workspace = {
      ...newWorkspace,
      id: crypto.randomUUID(),
    };
    setWorkspaces((prev: Workspace[]) => [...prev, workspace]);
    setSelectedWorkspace(newWorkspace.name);
    setIsNewWorkspaceModal(false);
  };

  const workspaceColors = [
    { colorName: "yellow", colorCode: "rgb(250, 204, 21)" },
    { colorName: "green", colorCode: "oklch(79.2% 0.209 151.711)" },
    { colorName: "blue", colorCode: "oklch(70.7% 0.165 254.624)" },
    { colorName: "purple", colorCode: "oklch(71.4% 0.203 305.504)" },
    { colorName: "pink", colorCode: "oklch(71.8% 0.202 349.761)" },
    { colorName: "red", colorCode: "oklch(70.4% 0.191 22.216)" },
    { colorName: "orange", colorCode: "oklch(75% 0.183 55.934)" },
  ];

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/30 h-screen w-screen flex items-center">
      <div
        className={`dashboard__modal`}
        style={{ borderColor: newWorkspace.color }}
      >
        <div className="flex justify-between gap-8">
          <h2 className="modal__heading" style={{ color: newWorkspace.color }}>
            Create New Workspace
          </h2>

          <button
            onClick={() => setIsNewWorkspaceModal(false)}
            className="text-white text-2xl"
            style={{ color: newWorkspace.color }}
          >
            x
          </button>
        </div>
        <div className="create-workspace__form">
          <form onSubmit={addNewWorkspace} className="create-workspace__name">
            <div className="modal__field">
              <label
                htmlFor="workspace-name"
                style={{ color: newWorkspace.color }}
                className="modal__label"
              >
                Workspace Name:
              </label>
              <input
                type="text"
                id="workspace-name"
                placeholder=""
                value={newWorkspace.name}
                className="modal__input"
                style={{ borderColor: newWorkspace.color }}
                onChange={(e) => {
                  setNewWorkspace((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
                required
              />
            </div>
            <div className="modal__field">
              <fieldset
                name="select-color"
                id="select-color"
                className="modal__fieldset"
              >
                <legend
                  className="modal__label"
                  style={{ color: newWorkspace.color }}
                >
                  Select Color
                </legend>
                <div className="flex gap-3">
                  {workspaceColors.map((color, index) => (
                    <label
                      key={index}
                      className={`h-6 w-6 rounded-2xl ${
                        newWorkspace.color === color.colorCode
                          ? "active border-2 border-white"
                          : ""
                      }`}
                      style={{ backgroundColor: color.colorCode }}
                    >
                      <input
                        id={color.colorName}
                        name="workspace-color"
                        type="radio"
                        value={color.colorName}
                        className="hidden-input"
                        onChange={() => {
                          setNewWorkspace((prev) => ({
                            ...prev,
                            color: color.colorCode,
                          }));
                        }}
                      ></input>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="modal__field">
              <fieldset
                name="select-icon"
                id="select-icon"
                className="modal__fieldset"
              >
                <legend
                  className="modal__label"
                  style={{ color: newWorkspace.color }}
                >
                  Select Icon
                </legend>
                <div className="flex gap-3">
                  {workspaceIcons.map((icon, index) => {
                    const IconComponent = icon.component;
                    return (
                      <label
                        key={index}
                        className={`h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer transition-all border-2`}
                        style={{
                          borderColor: newWorkspace.color,
                          ...(newWorkspace.icon === icon.id
                            ? {
                                backgroundColor: newWorkspace.color,
                                color: "rgb(0 0 0)",
                              }
                            : { color: newWorkspace.color }),
                        }}
                      >
                        <IconComponent style={{ fontSize: icon.size }} />
                        <input
                          id={icon.id}
                          name="workspace-icon"
                          type="radio"
                          value={icon.id}
                          className="hidden-input"
                          onChange={() => {
                            setNewWorkspace((prev) => ({
                              ...prev,
                              icon: icon.id,
                            }));
                          }}
                        ></input>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
            <button
              type="submit"
              className="modal__button"
              style={{ backgroundColor: newWorkspace.color }}
            >
              Add Workspace
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
