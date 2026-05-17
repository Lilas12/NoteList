import styled, { keyframes } from 'styled-components';

const popIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.9) rotate(-1deg);
  }
  70% {
    transform: translateY(-4px) scale(1.02) rotate(0.5deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(0deg);
  }
`;


const floatCard = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

// --- STYLED COMPONENTS ---
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ListTitle = styled.h3`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const NoteCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 18px;
  border-left: 6px solid #a855f7;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;


  animation:
    ${popIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards,
    ${floatCard} 5s ease-in-out infinite 0.5s;

  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 35px rgba(168, 85, 247, 0.25);
    border-left-color: #f43f5e;
  }
`;

const TextContent = styled.div`
  flex: 1;
  padding-right: 10px;
`;

const NoteTitle = styled.h4`
  margin: 0 0 6px 0;
  color: #0f172a;
  font-size: 17px;
  font-weight: 700;
`;

const NoteDescription = styled.p`
  margin: 0;
  color: #475569;
  font-size: 14px;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 10px;
`;

const ActionButton = styled.button`
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.25);

  &:hover {
    transform: translateY(-3px) scale(1.05);
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }
`;

const EditButton = styled(ActionButton)`
  background: #fef3c7;
  color: #d97706;
  &:hover {
    background: #fde68a;
    box-shadow: 0 4px 10px rgba(217, 119, 6, 0.2);
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #fee2e2;
  color: #dc2626;
  &:hover {
    background: #fecaca;
    box-shadow: 0 4px 10px rgba(220, 38, 38, 0.2);
  }
`;

const EmptyState = styled.p`
  color: #a3a9b1;
  font-style: italic;
  text-align: center;
  padding: 30px;
  font-size: 16px;
`;

// --- COMPONENT ---
function NoteList({ notes, onDeleteNote, onEditNote }) {
  return (
    <ListWrapper>
      <ListTitle>My Notes</ListTitle>
      {notes.length === 0 ? (
        <EmptyState>No notes saved yet. Add one above! ✨</EmptyState>
      ) : (
        notes.map(note => (
          <NoteCard key={note.id}>
            <TextContent>
              <NoteTitle>{note.title}</NoteTitle>
              <NoteDescription>{note.description}</NoteDescription>
            </TextContent>
            <ButtonContainer>
              <EditButton onClick={() => onEditNote(note)}>Edit</EditButton>
              <DeleteButton onClick={() => onDeleteNote(note.id)}>Delete</DeleteButton>
            </ButtonContainer>
          </NoteCard>
        ))
      )}
    </ListWrapper>
  );
}

export default NoteList;
