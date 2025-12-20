import { useState, type ChangeEvent } from "react";
import type { Note, Workspace } from "../types";
import "../styles/notes.scss";
import { workspaceIcons } from "../utils/iconLibrary";
import type { IconType } from "react-icons";

interface Props {
  setNotes: (notes: Note[]) => void;
  currentWorkspace: string;
  workspaces: Workspace[];
}

function AddNoteForm({ setNotes, currentWorkspace, workspaces }: Props) {
  const [note, setNote] = useState({
    body: "",
    workspaceId:
      // if all, the workdspace need to be set by the fieldset
      currentWorkspace === "all" ? workspaces[0].name : currentWorkspace,
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
      workspaceId: note.workspaceId,
    };

    const updatedNotes = [...existingNotes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    //
    setNote({
      body: "",
      workspaceId:
        currentWorkspace === "all" ? workspaces[0].name : currentWorkspace,
    });
  }

  function updateNoteBody(e: ChangeEvent<HTMLInputElement>) {
    setNote((prev) => ({ ...prev, body: e.target.value }));
  }

  return (
    <>
      <form onSubmit={createNote} className="form__grid gap-x_2 gap-y-3">
        <div
          style={{
            borderColor: workspaces.find(
              (workspace) => workspace.name === note.workspaceId
            )?.color,
          }}
          className="note__container"
        >
          <input
            type="text"
            className="form__textarea"
            value={note.body}
            onChange={updateNoteBody}
            name="noteContent"
            placeholder="Start Typing..."
            autoComplete="off"
          />
        </div>
        {currentWorkspace === "all" && (
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
                  htmlFor={workspace.id}
                  className={`p-2 rounded-4xl border-2 ${
                    workspace.name === note.workspaceId
                      ? "border-white"
                      : workspace.color
                  }`}
                  style={{ backgroundColor: workspace.color }}
                  key={index}
                >
                  <IconComponent style={{ fontSize: iconData?.size }} />
                  <input
                    className="hidden-input"
                    id={workspace.id}
                    value={workspace.name}
                    checked={note.workspaceId === workspace.name}
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
          className="form__submit mx-2 px-4  text-black font-semibold rounded-lg "
          style={{
            backgroundColor: workspaces.find(
              (workspace) => workspace.name === note.workspaceId
            )?.color,
          }}
        >
          Add Note
        </button>
      </form>
    </>
  );
}

export default AddNoteForm;
