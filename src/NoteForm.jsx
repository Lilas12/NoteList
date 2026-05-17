import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// --- ANIMATIONS ---
// Formuläret glider upp och tonas in med en fjädrande snärt
const popFormIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

// Puls-effekt för fokus på inmatningsfälten (matchar neonlila/rosa från rubriken)
const inputGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.25); }
  100% { box-shadow: 0 0 0 8px rgba(168, 85, 247, 0); }
`;

// --- STYLED COMPONENTS ---
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: #ffffff; /* HELT VITT som du vill ha det! */
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  margin-bottom: 35px;

  /* Kopplar på den rörliga introanimationen */
  animation: ${popFormIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  }
`;

const FormTitle = styled.h3`
  margin: 0 0 5px 0;
  color: #0f172a; /* Mörk text för perfekt läsbarhet på vitt */
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const Input = styled.input`
  padding: 14px;
  border: 2px solid #eef2f5;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  background-color: #fcfdfe;
  transition: all 0.25s ease;

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    outline: none;
    border-color: #a855f7; /* Neonlila kant vid fokus */
    background-color: #ffffff;
    animation: ${inputGlow} 1.5s infinite; /* Pulserande glödeffekt */
  }
`;

const TextArea = styled.textarea`
  padding: 14px;
  border: 2px solid #eef2f5;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  background-color: #fcfdfe;
  min-height: 100px;
  resize: vertical;
  transition: all 0.25s ease;

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    outline: none;
    border-color: #a855f7; /* Neonlila kant vid fokus */
    background-color: #ffffff;
    animation: ${inputGlow} 1.5s infinite; /* Pulserande glödeffekt */
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const BaseButton = styled.button`
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    transform: translateY(-3px); /* Knappen lyfter synligt */
  }

  &:active {
    transform: translateY(-1px); /* Fjädrar tillbaka snabbt vid klick */
  }
`;

const SubmitButton = styled(BaseButton)`
  flex: 2;
  // Matchar din episka neonrubrik: Lila till rosa gradient! Smaragdgrön vid redigering.
  background: ${props => props.isEditing
    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    : 'linear-gradient(135deg, #a855f7 0%, #f43f5e 100%)'};
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

  &:hover {
    filter: brightness(1.1);
    box-shadow: 0 8px 20px rgba(244, 63, 94, 0.3);
  }
`;

const CancelButton = styled(BaseButton)`
  flex: 1;
  background-color: #f1f2f6;
  color: #57606f;

  &:hover {
    background-color: #dfe4ea;
  }
`;

// --- COMPONENT ---
function NoteForm({ onAddNote, editingNote, onUpdateNote, onCancelEdit }) {
  const [title, setTitle] = useState(editingNote ? editingNote.title : '');
  const [description, setDescription] = useState(editingNote ? editingNote.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    if (editingNote) {
      onUpdateNote(editingNote.id, title, description);
    } else {
      onAddNote(title, description);
    }

    setTitle('');
    setDescription('');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>{editingNote ? 'Edit Note' : 'Add New Note'}</FormTitle>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        placeholder="Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <ButtonGroup>
        <SubmitButton type="submit" isEditing={!!editingNote}>
          {editingNote ? 'Save Changes' : 'Add Note'}
        </SubmitButton>
        {editingNote && (
          <CancelButton type="button" onClick={onCancelEdit}>Cancel</CancelButton>
        )}
      </ButtonGroup>
    </FormContainer>
  );
}

export default NoteForm;
