import { useEffect, useState } from "react";
import "./App.css";
import AddNoteForm from "./components/AddNoteForm";
import NoteItem from "./components/Note.tsx";
import type { Note } from "./types.ts";
import "./styles/notes.scss";

function App() {
  // Set notes from localStorage data on render
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const notesStorage = localStorage.getItem("notes");
      return notesStorage ? JSON.parse(notesStorage) : [];
    } catch {
      return [];
    }
  });

  // Update localStorage when notes is updated
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <>
      <div className="bg-neutral-800 min-h-screen p-4">
        <header className="text-2xl font-bold mb-6 text-yellow-400">
          To Do List
        </header>
        <main>
          <div className="mb-6">
            <AddNoteForm setNotes={setNotes} />
          </div>
          <div className="flex gap-3">
            {notes?.map((note: Note, index: number) => (
              <NoteItem
                note={note} // note data
                onUpdateNote={(updateNote: Note) => {
                  setNotes((prevNotes) =>
                    prevNotes.map((n) => (n.id === note.id ? updateNote : n))
                  );
                }}
                deleteNote={(noteId: string) => {
                  setNotes((prevNotes) =>
                    prevNotes.filter((n) => n.id !== noteId)
                  );
                }}
                key={index}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
