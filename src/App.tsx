import { useEffect, useState } from "react";
import "./App.css";
import AddNoteForm from "./components/AddNoteForm";

interface Note {
  id: string;
  createdAt: string;
  noteBody: string;
}

function App() {
  const [notes, setNotes] = useState(() => {
    const notesStorage = localStorage.getItem("notes");
    return notesStorage ? JSON.parse(notesStorage) : [];
  });

  // useEffect(() => {
  //   const notesStorage = localStorage.getItem("notes");
  //   const notesObject = notesStorage ? JSON.parse(notesStorage) : [];
  //   setNotes(notesObject);
  // }, [notesTrigger]);

  return (
    <>
      <div className="p-4">
        <header className="text-xl font-bold mb-4">To Do List</header>
        <main>
          <AddNoteForm setNotes={setNotes} />
          <div className="">
            <ul>
              {notes?.map((note, index) => (
                <li key={index}>{note.noteBody}</li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
