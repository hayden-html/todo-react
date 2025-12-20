import "../styles/notes.scss";
import type { Note, Workspace } from "../types";
import { MdClose } from "react-icons/md";

export default function Notes({
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

  return (
    <div
      className="relative w-fit note__container"
      style={{
        borderColor: workspaces.find(
          (workspace) => note.workspaceId === workspace.name
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
