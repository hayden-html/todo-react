import "../styles/notes.scss";

export default function Notes({ note, onUpdateNote, deleteNote }) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedNote = { ...note, noteBody: e.target.value };
    onUpdateNote(updatedNote);
  };

  const handleDelete = () => {
    deleteNote(note.id);
  };

  return (
    <div className="relative w-fit">
      <textarea
        name="noteBody"
        id=""
        onChange={handleChange}
        value={note.noteBody}
        className="note"
      ></textarea>
      <button
        onClick={handleDelete}
        className="text-white absolute top-1 right-3 cursor-pointer font-semibold"
      >
        X
      </button>
    </div>
  );
}
