import { useState } from "react";
import "./App.css";
import AddNoteForm from "./components/AddNoteForm";

function App() {
  return (
    <>
      <div className="p-4">
        <header className="text-xl font-bold mb-4">To Do List</header>
        <main>
          <AddNoteForm />
        </main>
      </div>
    </>
  );
}

export default App;
