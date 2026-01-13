import { useEffect, useState } from "react";
import "./App.css";
import AddNoteForm from "./components/AddNoteForm";
import NoteItem from "./components/Note.tsx";
import type { Note, Workspace } from "./types.ts";
import "./styles/notes.scss";
import Sidebar from "./components/layout/Sidebar.tsx";
import CreateWorkspaceModal from "./components/CreateWorkspaceModal.tsx";
// import Timer from "./components/Timer.tsx";
// import TicTacToe from "./components/TicTacToe.tsx";
import EditWorkspacesModal from "./components/EditWorkspacesModal.tsx";

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

  const duplicateNote = (note: Note) => {
    const duplicateNote = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [...prev, duplicateNote]);
  };

  const updateNote = (workspaceId: string, noteId: string) => {
    console.log(noteId);
    setNotes((prev) =>
      prev.map((note) =>
        note.id == noteId ? { ...note, workspaceId: workspaceId } : note
      )
    );
  };
  // Update localStorage when notes is updated

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const [isNewWorkspaceModal, setIsNewWorkspaceModal] = useState(false);
  const [isEditWorkspaceModal, setIsEditWorkspaceModal] = useState(false);

  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => {
    const defaultWorkspace: Workspace[] = [
      {
        id: crypto.randomUUID(),
        name: "My First Workspace",
        color: "rgb(250 204 21)",
        icon: "home",
      },
    ];
    try {
      const workspaceStorage = localStorage.getItem("workspaces");
      return workspaceStorage ? JSON.parse(workspaceStorage) : defaultWorkspace;
    } catch {
      return defaultWorkspace;
    }
  });

  useEffect(() => {
    localStorage.setItem("workspaces", JSON.stringify(workspaces));
  }, [workspaces]);

  const [selectedWorkspace, setSelectedWorkspace] = useState(
    workspaces.length > 1 ? "all" : workspaces[0].id
  );

  return (
    <>
      <div className="flex bg-neutral-800 min-h-screen">
        <Sidebar
          setIsNewWorkspaceModal={setIsNewWorkspaceModal}
          workspaces={workspaces}
          selectedWorkspace={selectedWorkspace}
          setSelectedWorkspace={setSelectedWorkspace}
          setIsEditWorkspaceModal={setIsEditWorkspaceModal}
        ></Sidebar>

        <div className=" grow p-4">
          <header
            className="text-2xl font-bold mb-6"
            style={{
              color:
                selectedWorkspace === "all"
                  ? "var(--all-color)"
                  : workspaces.find(
                      (workspace) => workspace.id === selectedWorkspace
                    )?.color,
            }}
          >
            To Do List
          </header>
          <main>
            <div className="mb-6">
              <AddNoteForm
                setNotes={setNotes}
                selectedWorkspace={selectedWorkspace}
                workspaces={workspaces}
              />
            </div>
            <div className="flex gap-3">
              {notes
                .filter(
                  (note) =>
                    selectedWorkspace === "all" ||
                    note.workspaceId ===
                      workspaces.find(
                        (workspace) => workspace.id == selectedWorkspace
                      )?.id
                )
                .map((note: Note) => (
                  <NoteItem
                    note={note} // note data
                    onUpdateNote={(updateNote: Note) => {
                      setNotes((prevNotes) =>
                        prevNotes.map((n) =>
                          n.id === note.id ? updateNote : n
                        )
                      );
                    }}
                    duplicateNote={(x) => duplicateNote(x)}
                    deleteNote={(noteId: string) => {
                      setNotes((prevNotes) =>
                        prevNotes.filter((n) => n.id !== noteId)
                      );
                    }}
                    key={note.id}
                    workspaces={workspaces}
                    updateNote={updateNote}
                  />
                ))}
            </div>
          </main>
        </div>
      </div>

      {isNewWorkspaceModal && (
        <CreateWorkspaceModal
          setIsNewWorkspaceModal={setIsNewWorkspaceModal}
          setWorkspaces={setWorkspaces}
          setSelectedWorkspace={setSelectedWorkspace}
        />
      )}

      {isEditWorkspaceModal && (
        <EditWorkspacesModal
          setIsEditWorkspaceModal={setIsEditWorkspaceModal}
          workspaces={workspaces}
          setWorkspaces={setWorkspaces}
        />
      )}
    </>
  );
}

export default App;
