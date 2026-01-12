import { useEffect, useRef } from "react";
import "../styles/notes.scss";
import type { Note, Workspace } from "../types";
// import { MdClose } from "react-icons/md";
import { BsChevronRight, BsThreeDotsVertical } from "react-icons/bs";
import {
  MdAudiotrack,
  MdHome,
  MdOutlinePets,
  MdOutlineWork,
  MdRocketLaunch,
  MdShoppingCart,
  MdSportsEsports,
} from "react-icons/md";
import { CgChevronRight } from "react-icons/cg";
import { workspaceIcons } from "../utils/iconLibrary";

export default function Note({
  note,
  onUpdateNote,
  duplicateNote,
  deleteNote,
  workspaces,
  updateNote,
}: {
  note: Note;
  onUpdateNote: (param: Note) => void;
  deleteNote: (id: string) => void;
  duplicateNote: (x: Note) => void;
  workspaces: Workspace[];

  updateNote: (notes: string, noteId: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedNote = { ...note, noteBody: e.target.value };
    onUpdateNote(updatedNote);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.target.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        if (note.width !== `${width}px` || note.height !== `${height}px`) {
          const updatedNote = {
            ...note,
            width: `${width}px`,
            height: `${height}px`,
          };
          onUpdateNote(updatedNote);
        }
      }
    });
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [note, onUpdateNote]);
  const defaultHeight = "200px";
  const defaultWidth = "200px";

  // const updateNoteWorkspace = (newWorkspaceId) => {
  //   const currentNotes = note
  //   setNote((prev) => [...prev, workspaceName: newWorkspaceId])
  // };

  return (
    <div ref={containerRef} className="relative">
      <div
        className="note__container"
        style={{
          width: note.width || defaultWidth,
          height: note.height || defaultHeight,
          borderColor: workspaces.find(
            (workspace) => note.workspaceName === workspace.name
          )?.color,
        }}
      >
        <textarea
          name="noteBody"
          id=""
          onChange={handleChange}
          value={note.noteBody}
          className="note__textarea"
        ></textarea>
      </div>
      {/* <button
        onClick={handleDelete}
        className="text-white absolute top-2 right-2 cursor-pointer font-semibold"
      >
        <MdClose className="text-xl" />
      </button> */}
      <div className="note-actions">
        <button className="text-white absolute top-3 right-2 cursor-pointer font-semibold">
          <BsThreeDotsVertical className="text-xl" />
        </button>
        <menu className="note-menu">
          <div className="flex flex-col z-12 items-start ">
            {workspaces.length > 1 && (
              <div className="note-menu-link note-submenu__head">
                <p>Change Workspace</p>
                <CgChevronRight className="text-2xl" />
                <div className="note-submenu__list pl-4 absolute">
                  <div className="flex flex-col bg-neutral-700 overflow-hidden rounded-lg">
                    {workspaces.map((workspace, index) => {
                      const icons = workspaceIcons.find(
                        (x) => workspace.icon == x.id
                      );
                      const WorkspaceIcon = icons?.component;
                      return (
                        <button
                          className="note-menu-link flex gap-3 items-center"
                          onClick={() => updateNote(workspace.name, note.id)}
                          style={
                            {
                              // color: workspace.color,
                              // backgroundColor:
                              //   workspace.name == note.workspaceName
                              //     ? "var(--color-neutral-600)"
                              //     : "var(--color-neutral-700)",
                            }
                          }
                          key={index}
                        >
                          <WorkspaceIcon
                            className="text-xl"
                            style={{
                              color: workspace.color,
                            }}
                          />
                          <span>
                            {workspace.name}{" "}
                            {workspace.name == note.workspaceName
                              ? "(current)"
                              : ""}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            <button
              className="note-menu-link"
              onClick={() => duplicateNote(note)}
            >
              Duplicate Note
            </button>
            <button
              className="note-menu-link"
              onClick={() => deleteNote(note.id)}
            >
              Delete Note
            </button>
          </div>
        </menu>
      </div>
    </div>
  );
}
