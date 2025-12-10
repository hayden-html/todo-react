import { useState, type ChangeEvent } from "react";

interface Note {
  id: string;
  createdAt: string;
  noteBody: string;
}

interface Props {
  setNotes: (notes: Note[]) => void;
}

function AddNoteForm({ setNotes }: Props) {
  const [note, setNote] = useState("");

  function createNote(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    // set to local storage
    const noteStorage = localStorage.getItem("notes");

    const existingNotes: Note[] = noteStorage ? JSON.parse(noteStorage) : [];

    const newNote: Note = {
      id: crypto.randomUUID(),
      noteBody: note,
      createdAt: new Date().toISOString(),
    };

    const updatedNotes = [...existingNotes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNote("");
  }

  function updateNote(e: ChangeEvent<HTMLInputElement>) {
    const noteContent = e.target.value;
    setNote(noteContent);
  }

  return (
    <>
      <form onSubmit={createNote}>
        <label htmlFor="addNote" className="block">
          Add Note:
        </label>
        <input
          type="text"
          className="border-2 p-2"
          value={note}
          onChange={updateNote}
          name="noteContent"
        />
        <button type="submit" className="mx-2 border-2 p-2">
          Add Note
        </button>
      </form>
    </>
  );
}

export default AddNoteForm;
