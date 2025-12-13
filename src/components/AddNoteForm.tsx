import { useState, type ChangeEvent } from "react";
import type { Note } from "../types";
import "../styles/notes.scss";

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
        <input
          type="text"
          className="note"
          value={note}
          onChange={updateNote}
          name="noteContent"
          placeholder="Start Typing..."
        />
        <button
          type="submit"
          className="mx-2 p-2 bg-yellow-400 text-yellow-950 font-semibold rounded-lg "
        >
          Add Note
        </button>
      </form>
    </>
  );
}

export default AddNoteForm;
