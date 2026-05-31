import { useState, useEffect } from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import './index.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('alpha_bit_notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    localStorage.setItem('alpha_bit_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (title, description) => {
    const newNote = { id: Date.now(), title, description };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id, updatedTitle, updatedDescription) => {
    setNotes(notes.map(note =>
      note.id === id
        ? { ...note, title: updatedTitle, description: updatedDescription }
        : note
    ));
    setEditingNote(null);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (editingNote && editingNote.id === id) {
      setEditingNote(null);
    }
  };

  return (
    <>

      <div className="container-background">
        <div className="blob purple-blob" />
        <div className="blob blue-blob" />
        <div className="blob pink-blob" />
      </div>


      <div className="app-container">


        <header className="header-section">
          <h1 className="page-title">
            My<span>Note</span>
          </h1>
          <p className="page-subtitle">Notes Management App — Level 1</p>
        </header>


        <NoteForm
          key={editingNote ? editingNote.id : 'new'}
          onAddNote={addNote}
          editingNote={editingNote}
          onUpdateNote={updateNote}
          onCancelEdit={() => setEditingNote(null)}
        />


        <NoteList
          notes={notes}
          onDeleteNote={deleteNote}
          onEditNote={setEditingNote}
        />
      </div>
    </>
  );
}

export default App;
