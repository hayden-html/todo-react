// Todo - ensure that the workspace fieldselect defaults to the first workspace, when deleting workspace that is currently selected, the note.workspace is not updated

import { useState, type ChangeEvent } from "react";
import type { Note, Workspace } from "../types";
import "../styles/notes.scss";
import { workspaceIcons } from "../utils/iconLibrary";
import type { IconType } from "react-icons";

interface Props {
  setNotes: (notes: Note[]) => void;
  selectedWorkspace: string;
  workspaces: Workspace[];
}

function AddNoteForm({ setNotes, selectedWorkspace, workspaces }: Props) {
  const [note, setNote] = useState({
    title: "",
    body: "",
    workspace: workspaces[0].id,
  });

  const isWorkspaceAvailable = workspaces.some(
    (workspace) => workspace.id == note.workspace,
  );
  if (!isWorkspaceAvailable) {
    setNote((prev) => ({ ...prev, workspace: workspaces[0].id }));
  }

  function createNote(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    // set to local storage
    const noteStorage = localStorage.getItem("notes");

    const existingNotes: Note[] = noteStorage ? JSON.parse(noteStorage) : [];

    const newNote: Note = {
      id: crypto.randomUUID(),
      title: note.title,
      body: note.body,
      createdAt: new Date().toISOString(),
      workspace:
        // think this is wrong
        selectedWorkspace == "all" ? note.workspace : selectedWorkspace,
      height: "4rem",
      width: "4rem",
    };

    const updatedNotes = [...existingNotes, newNote];
    setNotes(updatedNotes);
    //
    setNote({
      title: "",
      body: "",
      workspace:
        selectedWorkspace == "all" ? note.workspace : selectedWorkspace,
    });
  }

  function updatebody(e: ChangeEvent<HTMLTextAreaElement>) {
    setNote((prev) => ({ ...prev, body: e.target.value }));
  }

  const currentColor = workspaces.find((workspace) =>
    selectedWorkspace == "all"
      ? workspace.id === note.workspace
      : workspace.id === selectedWorkspace,
  )?.color;

  return (
    <>
      <form onSubmit={createNote} className="form__grid gap-x_2 gap-y-3">
        <div
          style={{
            borderColor: currentColor,
          }}
          className="note__container"
        >
          <textarea
            className="form__textarea"
            value={note.body}
            onChange={updatebody}
            name="noteContent"
            placeholder="Start Typing..."
            autoComplete="off"
          />
        </div>
        {selectedWorkspace === "all" && (
          <fieldset
            name="select-workspace"
            className="form__select-workspace flex gap-3"
          >
            {workspaces.map((workspace: Workspace, index: number) => {
              const iconData =
                workspaceIcons.find((icon) => icon.id === workspace.icon) ||
                workspaceIcons[0];
              const IconComponent: IconType = iconData?.component;

              return (
                <label
                  htmlFor={"note-workspace-" + workspace.id}
                  className={`p-2 rounded-4xl border-2 `}
                  style={{
                    backgroundColor: workspace.color,
                    borderColor:
                      workspace.id === note.workspace
                        ? "white"
                        : workspace.color,
                  }}
                  key={index}
                >
                  <IconComponent style={{ fontSize: iconData?.size }} />
                  <input
                    className="hidden-input"
                    id={"note-workspace-" + workspace.id}
                    value={workspace.id}
                    checked={note.workspace === workspace.id}
                    onChange={(e) =>
                      setNote((prev) => ({
                        ...prev,
                        workspace: e.target.value,
                      }))
                    }
                    type="radio"
                    name="workspace-select"
                  ></input>
                </label>
              );
            })}
          </fieldset>
        )}
        <button
          type="submit"
          className="form__submit"
          style={{
            backgroundColor: currentColor,
          }}
        >
          Add Note
        </button>
      </form>
    </>
  );
}

export default AddNoteForm;
