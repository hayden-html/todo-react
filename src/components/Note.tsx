export default function Notes({ note, onUpdateNote, deleteNote }) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedNote = { ...note, noteBody: e.target.value };
    onUpdateNote(updatedNote);
  };

  const handleDelete = () => {
    deleteNote(note.id);
  };

  return (
    <>
      <textarea
        name="noteBody"
        id=""
        onChange={handleChange}
        value={note.noteBody}
      ></textarea>
      <button onClick={handleDelete}>X</button>
    </>
  );
}
