import { useEffect, useState } from "react";
import "./App.css";
import AddNoteForm from "./components/AddNoteForm";
import Note from "./components/Note.tsx";

type;

interface Note {
  id: string;
  createdAt: string;
  noteBody: string;
}

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
      <div className="p-4">
        <header className="text-xl font-bold mb-4">To Do List</header>
        <main>
          <AddNoteForm setNotes={setNotes} />
          <div className="">
            <ul>
              {notes?.map((note: Note, index: number) => (
                <Note
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
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
