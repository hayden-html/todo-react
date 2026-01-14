// Todo - ensure that the workspace fieldselect defaults to the first workspace, when deleting workspace that is currently selected, the note.workspaceId is not updated

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
    body: "",
    workspaceId: workspaces[0].id,
  });

  function createNote(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    // set to local storage
    const noteStorage = localStorage.getItem("notes");

    const existingNotes: Note[] = noteStorage ? JSON.parse(noteStorage) : [];

    const newNote: Note = {
      id: crypto.randomUUID(),
      noteBody: note.body,
      createdAt: new Date().toISOString(),
      workspaceId:
        selectedWorkspace == "all" ? note.workspaceId : selectedWorkspace,
      height: "4rem",
      width: "4rem",
    };

    const updatedNotes = [...existingNotes, newNote];
    setNotes(updatedNotes);
    //
    setNote({
      body: "",
      workspaceId:
        selectedWorkspace == "all" ? note.workspaceId : selectedWorkspace,
    });
  }

  function updateNoteBody(e: ChangeEvent<HTMLTextAreaElement>) {
    setNote((prev) => ({ ...prev, body: e.target.value }));
  }

  const currentColor = workspaces.find((workspace) =>
    selectedWorkspace == "all"
      ? workspace.id === note.workspaceId
      : workspace.id === selectedWorkspace
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
            onChange={updateNoteBody}
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
                      workspace.id === note.workspaceId
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
                    checked={note.workspaceId === workspace.id}
                    onChange={(e) =>
                      setNote((prev) => ({
                        ...prev,
                        workspaceId: e.target.value,
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
