import {
  BiCheckbox,
  BiCheckboxChecked,
  BiNote,
  BiSolidCheckbox,
  BiSolidCheckboxChecked,
} from "react-icons/bi";
import type { Note, Workspace } from "../types";
import { useState, type ChangeEvent } from "react";

import {
  MdAudiotrack,
  MdHome,
  MdOutlinePets,
  MdOutlineWork,
  MdRocketLaunch,
  MdShoppingCart,
  MdSportsEsports,
} from "react-icons/md";
import { BsCheckSquare, BsSticky, BsX } from "react-icons/bs";
import { workspaceIcons } from "../utils/iconLibrary";
import type { IconType } from "react-icons";

export default function NewNoteModal({
  notes,
  setNotes,
  selectedWorkspace,
  workspaces,
}: {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  selectedWorkspace: string;
  workspaces: Workspace[];
}) {
  const [newNoteModal, setNewNoteModal] = useState(false);

  const emptyNote = {
    id: crypto.randomUUID(),
    noteTitle: "",

    noteBody: "",
    workspaceId:
      selectedWorkspace === "all" ? workspaces[0].id : selectedWorkspace,
    createdAt: new Date().toISOString(),
    height: "64px",
    width: "64px",
  };
  const [newNote, setNewNote] = useState(emptyNote);

  function updateNoteTitle(e: ChangeEvent<HTMLInputElement>) {
    setNewNote((prev) => ({ ...prev, noteTitle: e.target.value }));
  }
  function updateNoteBody(e: ChangeEvent<HTMLTextAreaElement>) {
    setNewNote((prev) => ({ ...prev, noteBody: e.target.value }));
  }

  function saveNotes(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const existingNotes = notes || [];
    const updatedNotes = [...existingNotes, newNote];
    console.log(updatedNotes);

    setNotes(updatedNotes);
    setNewNote(emptyNote);
    setNewNoteModal(false);
  }

  return (
    <>
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setNewNoteModal(true)}
          className="rounded-4xl flex justify-center items-center w-12 aspect-square"
          style={{
            backgroundColor:
              selectedWorkspace === "all"
                ? "white"
                : workspaces.find((x) => x.id === selectedWorkspace)?.color,
          }}
        >
          <BsSticky className="text-[28px]" />
        </button>
        <button
          onClick={() => setNewNoteModal(true)}
          className="rounded-4xl p-2"
          style={{
            backgroundColor:
              selectedWorkspace === "all"
                ? "white"
                : workspaces.find((x) => x.id === selectedWorkspace)?.color,
          }}
        >
          <BsCheckSquare className="text-[28px]" />
        </button>
      </div>
      {newNoteModal && (
        <div className="modal-background">
          <div className="flex left-0 right-0 absolute  justify-center">
            <fieldset className="workspace-select px-3 flex flex-col gap-3">
              {workspaces.map((workspace, index) => {
                const iconData =
                  workspaceIcons.find((icon) => icon.id == workspace.icon) ||
                  workspaceIcons[0];
                const IconComponent: IconType = iconData?.component;
                return (
                  <label
                    className="workspace-select--item"
                    htmlFor={"new-note-modal-" + workspace.id}
                    style={{
                      color:
                        newNote.workspaceId === workspace.id
                          ? ""
                          : workspace.color,
                      backgroundColor:
                        newNote.workspaceId === workspace.id
                          ? workspace.color
                          : "",
                      borderColor: workspace.color,
                    }}
                    key={index}
                  >
                    <IconComponent style={{ fontSize: iconData.size }} />
                    <input
                      type="radio"
                      className="hidden-input"
                      onChange={(e) =>
                        setNewNote((prev) => ({
                          ...prev,
                          workspaceId: e.target.value,
                        }))
                      }
                      value={workspace.id}
                      checked={newNote.workspaceId === workspace.id}
                      id={"new-note-modal-" + workspace.id}
                      name="workspace-select"
                    />
                  </label>
                );
              })}
            </fieldset>
            <div
              className="rounded-2xl border-2 bg-neutral-800 p-2"
              style={{
                borderColor: workspaces.find(
                  (x) => x.id === newNote.workspaceId,
                )?.color,
              }}
            >
              <form onSubmit={saveNotes} className="flex flex-col">
                <input
                  placeholder="Title"
                  className="placeholder:text-neutral-400 text-neutral-200 font-semibold text-3xl leading-none  p-1.5 focus-within:outline-0 min-w-90
                  overflow-hidden min-h-20"
                  value={newNote.noteTitle}
                  onChange={updateNoteTitle}
                  type="text"
                />
                {/* <hr className="mt-2 text-neutral-600" /> */}
                <textarea
                  placeholder="Write you note here..."
                  className="placeholder:text-neutral-400 p-1.5 min-h-50 focus-within:outline-0 text-neutral-200 resize-none"
                  value={newNote.noteBody}
                  onChange={updateNoteBody}
                />
                <div className="mt-auto flex justify-end">
                  <button
                    type="submit"
                    className="m-2 p-2 px-4 rounded-xl text-neutral-800 font-semibold text-lg"
                    style={{
                      backgroundColor: workspaces.find(
                        (x) => x.id === newNote.workspaceId,
                      )?.color,
                    }}
                  >
                    Save Note
                  </button>
                  <button
                    className="m-2 p-2 px-4 rounded-xl text-neutral-800 font-semibold text-lg border-2"
                    style={{
                      color: workspaces.find(
                        (x) => x.id === newNote.workspaceId,
                      )?.color,
                    }}
                    onClick={() => setNewNoteModal(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
