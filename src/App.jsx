import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

// --- STYLED COMPONENTS ---
const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 80px 20px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;

  /* Din dämpade, mörka bakgrund */
  background-color: #090d16;
  background-image:
    radial-gradient(at 10% 10%, rgba(29, 78, 216, 0.2) 0px, transparent 50%),
    radial-gradient(at 90% 10%, rgba(107, 33, 168, 0.15) 0px, transparent 50%),
    radial-gradient(at 50% 90%, rgba(13, 148, 136, 0.15) 0px, transparent 50%);
`;

const Container = styled.div`
  max-width: 580px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 50px;

  // Lite kraftigare skugga bakom texten nu när den är större
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);

  h1 {
    font-size: 80px; /* ÄNDRING: Gjorde rubriken mycket större! */
    color: #ffffff;  /* ÄNDRING: Kritvit färg för maximal kontrast */
    margin-bottom: 12px;
    font-weight: 900;
    letter-spacing: -2px; /* Tätare och modernare bokstavsavstånd */
    line-height: 1.1;
  }

  span {
    /* ÄNDRING: En ny, glödande neon-gradient (Violett till Rosa) som poppar brutalt mot det mörka */
    background: linear-gradient(135deg, #a855f7 0%, #f43f5e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: #a3a9b1; /* Ljusat upp undertexten lite så den matchar det nya ljuset */
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase; /* Gör undertexten till versaler för en stilren look */
  }
`;

// --- COMPONENT ---
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
    <PageWrapper>
      <Container>
        <Header>
  <h1>My<span>Note</span></h1>
  <p>Notes Management App — Level 1</p>
</Header>

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
      </Container>
    </PageWrapper>
  );
}

export default App;
