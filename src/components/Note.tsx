import { useEffect, useRef } from "react";
import "../styles/notes.scss";
import type { Note, Workspace } from "../types";
import { MdClose } from "react-icons/md";

export default function Note({
  note,
  onUpdateNote,
  deleteNote,
  workspaces,
}: {
  note: Note;
  onUpdateNote: (param: Note) => void;
  deleteNote: (id: string) => void;
  workspaces: Workspace[];
}) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedNote = { ...note, noteBody: e.target.value };
    onUpdateNote(updatedNote);
  };

  const handleDelete = () => {
    deleteNote(note.id);
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
  return (
    <div
      ref={containerRef}
      className="relative note__container"
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
      <button
        onClick={handleDelete}
        className="text-white absolute top-2 right-2 cursor-pointer font-semibold"
      >
        <MdClose className="text-xl" />
      </button>
    </div>
  );
}
