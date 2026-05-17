import { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

// --- GLOBAL STYLES ---
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
    background-color: #060814;
    overflow-x: hidden;
  }
`;


const meshMove = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.15); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

const meshMoveReverse = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(-40px, 40px) scale(1.1); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

//STYLED COMPONENTS
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 80px 20px;
  box-sizing: border-box;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  overflow: hidden;
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  background: #060814;
`;


const Blob = styled.div`
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: screen;
  filter: blur(120px);
  opacity: 0.4;
`;

const PurpleBlob = styled(Blob)`
  width: 600px;
  height: 600px;
  background: #6b21a8;
  top: -100px;
  left: -50px;
  animation: ${meshMove} 25s ease-in-out infinite;
`;

const BlueBlob = styled(Blob)`
  width: 700px;
  height: 700px;
  background: #1d4ed8;
  bottom: -150px;
  right: -100px;
  animation: ${meshMoveReverse} 30s ease-in-out infinite;
`;

const PinkBlob = styled(Blob)`
  width: 500px;
  height: 500px;
  background: #be185d;
  top: 30%;
  left: 40%;
  animation: ${meshMove} 20s ease-in-out infinite;
  animation-delay: -5s;
`;

const Container = styled.div`
  max-width: 580px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 50px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);

  h1 {
    font-size: 80px;
    color: #ffffff;
    margin-bottom: 12px;
    font-weight: 900;
    letter-spacing: -2px;
    line-height: 1.1;
  }

  span {
    background: linear-gradient(135deg, #e2c6fc 0%, #f43f5e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: #d7d8db;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
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
    <>
      <GlobalStyle />

      <PageWrapper>

        <BackgroundContainer>
          <PurpleBlob />
          <BlueBlob />
          <PinkBlob />
        </BackgroundContainer>

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
    </>
  );
}

export default App;
