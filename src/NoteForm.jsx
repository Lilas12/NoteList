import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';


const popFormIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(60px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;


const float = keyframes`
  0% { transform: translateY(0px); }
  70% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
`;

const inputGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4); }
  100% { box-shadow: 0 0 0 10px rgba(168, 85, 247, 0); }
`;

// --- STYLED COMPONENTS ---
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: #ffffff;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  margin-bottom: 35px;


  animation:
    ${popFormIn} 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.2) forwards,
    ${float} 4s ease-in-out infinite 0.6s;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;


  ${props => props.$hasError && css`
    animation: ${shake} 0.19s ease-in-out;
    border: 2px solid #f43f5e;
  `}

  &:hover {
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
  }
`;

const FormTitle = styled.h3`
  margin: 0 0 5px 0;
  color: #0f172a;
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
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder { color: #a0aec0; }

  &:focus {
    outline: none;
    border-color: #a855f7;
    background-color: #ffffff;
    transform: scale(1.01);
    animation: ${inputGlow} 1.5s infinite;
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
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder { color: #a0aec0; }

  &:focus {
    outline: none;
    border-color: #a855f7;
    background-color: #ffffff;
    transform: scale(1.01);
    animation: ${inputGlow} 1.5s infinite;
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
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.25);

  &:hover {
    transform: translateY(-4px) scale(1.03);
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`;

const SubmitButton = styled(BaseButton)`
  flex: 2;
  background: ${props => props.isEditing
    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    : 'linear-gradient(135deg, #a855f7 0%, #f43f5e 100%)'};
  color: white;
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);

  &:hover {
    filter: brightness(1.1);
    box-shadow: 0 10px 25px rgba(244, 63, 94, 0.4);
  }
`;

const CancelButton = styled(BaseButton)`
  flex: 1;
  background-color: #f1f2f6;
  color: #57606f;

  &:hover {
    background-color: #dfe4ea;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  }
`;

// --- COMPONENT ---
function NoteForm({ onAddNote, editingNote, onUpdateNote, onCancelEdit }) {
  const [title, setTitle] = useState(editingNote ? editingNote.title : '');
  const [description, setDescription] = useState(editingNote ? editingNote.description : '');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError(true);
      setTimeout(() => setError(false), 400);
      return;
    }

    if (editingNote) {
      onUpdateNote(editingNote.id, title, description);
    } else {
      onAddNote(title, description);
    }

    setTitle('');
    setDescription('');
  };

  return (
    <FormContainer onSubmit={handleSubmit} $hasError={error}>
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
