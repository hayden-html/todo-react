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
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const updatedNote = { ...note, [name]: value };
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

  // const updateNoteWorkspace = (newworkspace) => {
  //   const currentNotes = note
  //   setNote((prev) => [...prev, workspace: newworkspace])
  // };

  return (
    <div ref={containerRef} className="relative">
      <div
        className="note__container"
        style={{
          width: note.width || defaultWidth,
          height: note.height || defaultHeight,
          borderColor: workspaces.find(
            (workspace) => note.workspace === workspace.id,
          )?.color,
        }}
      >
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={note.title}
          className="note__textarea"
        ></input>
        <textarea
          name="body"
          id=""
          onChange={handleChange}
          value={note.body}
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
                        (x) => workspace.icon == x.id,
                      );
                      const WorkspaceIcon = icons?.component;
                      return (
                        <button
                          className="note-menu-link flex gap-3 items-center"
                          onClick={() => updateNote(workspace.id, note.id)}
                          style={
                            {
                              // color: workspace.color,
                              // backgroundColor:
                              //   workspace.id == note.workspace
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
                            {workspace.id == note.workspace ? "(current)" : ""}
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
