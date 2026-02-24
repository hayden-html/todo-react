import {
  BiCheckbox,
  BiCheckboxChecked,
  BiNote,
  BiSolidCheckbox,
  BiSolidCheckboxChecked,
} from "react-icons/bi";
import type { Note, Workspace } from "../types";
import { useState, type ChangeEvent, type FormEvent } from "react";

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
import UnsavedNoteWarningModal from "./UnsavedNoteWarningModal";

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
  const [unsavedWarning, setUnsavedWarning] = useState(false);

  const emptyNote = {
    id: crypto.randomUUID(),
    title: "",

    body: "",
    workspace:
      selectedWorkspace === "all" ? workspaces[0].id : selectedWorkspace,
    createdAt: new Date().toISOString(),
    height: "64px",
    width: "64px",
  };
  const [newNote, setNewNote] = useState(emptyNote);

  function updatetitle(e: ChangeEvent<HTMLInputElement>) {
    setNewNote((prev) => ({ ...prev, title: e.target.value }));
  }
  function updatebody(e: ChangeEvent<HTMLTextAreaElement>) {
    setNewNote((prev) => ({ ...prev, body: e.target.value }));
  }

  function saveNotes(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    const existingNotes = notes || [];
    const updatedNotes = [...existingNotes, newNote];
    console.log(updatedNotes);

    setNotes(updatedNotes);
    setNewNote(emptyNote);
    setNewNoteModal(false);
  }

  function exitModal() {
    if (
      emptyNote.title !== "" ||
      emptyNote.body !== "" ||
      unsavedWarning == false
    ) {
      console.log("unsaved");

      setUnsavedWarning(true);
    } else {
      setNewNoteModal(false);
    }
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
        <div className="modal-background" onClick={() => exitModal()}>
          <div
            className="flex left-0 right-0 absolute  justify-center"
            onClick={(e) => e.stopPropagation()}
          >
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
                        newNote.workspace === workspace.id
                          ? ""
                          : workspace.color,
                      backgroundColor:
                        newNote.workspace === workspace.id
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
                          workspace: e.target.value,
                        }))
                      }
                      value={workspace.id}
                      checked={newNote.workspace === workspace.id}
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
                borderColor: workspaces.find((x) => x.id === newNote.workspace)
                  ?.color,
              }}
            >
              <form onSubmit={saveNotes} className="flex flex-col">
                <input
                  placeholder="Title"
                  className="placeholder:text-neutral-400 text-neutral-200 font-semibold text-3xl leading-none  p-1.5 focus-within:outline-0 min-w-90
                  overflow-hidden min-h-20"
                  value={newNote.title}
                  onChange={updatetitle}
                  type="text"
                />
                {/* <hr className="mt-2 text-neutral-600" /> */}
                <textarea
                  placeholder="Write you note here..."
                  className="placeholder:text-neutral-400 p-1.5 min-h-50 focus-within:outline-0 text-neutral-200 resize-none"
                  value={newNote.body}
                  onChange={updatebody}
                />
                <div className="mt-auto flex justify-end gap-4">
                  <button
                    type="submit"
                    className="button"
                    style={{
                      backgroundColor: workspaces.find(
                        (x) => x.id === newNote.workspace,
                      )?.color,
                    }}
                  >
                    Save Note
                  </button>
                  <button
                    className="button border-2"
                    style={{
                      color: workspaces.find((x) => x.id === newNote.workspace)
                        ?.color,
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setUnsavedWarning(true);
                    }}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {unsavedWarning && (
        <UnsavedNoteWarningModal
          onSave={() => {
            saveNotes();
            setUnsavedWarning(false);
          }}
          onDiscard={() => {
            setUnsavedWarning(false);
            setNewNoteModal(false);
          }}
          onCancel={() => setUnsavedWarning(false)}
        />
      )}
    </>
  );
}
