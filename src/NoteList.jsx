import styled, { keyframes } from 'styled-components';


const popIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
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
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 18px;
  border-left: 5px solid #f39c12;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  animation: ${popIn} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const TextContent = styled.div`
  flex: 1;
  padding-right: 10px;
`;

const NoteTitle = styled.h4`
  margin: 0 0 6px 0;
  color: #1e293b;
  font-size: 16px;
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
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }

  &:active {
    transform: translateY(0);
  }
`;

const EditButton = styled(ActionButton)`
  background: #fef3c7;
  color: #d97706;
  &:hover { background: #fde68a; }
`;

const DeleteButton = styled(ActionButton)`
  background: #fee2e2;
  color: #dc2626;
  &:hover { background: #fecaca; }
`;

const EmptyState = styled.p`
  color: #f5efe6;
  font-style: italic;
  text-align: center;
  padding: 20px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

// --- COMPONENT ---
function NoteList({ notes, onDeleteNote, onEditNote }) {
  return (
    <ListWrapper>
      <ListTitle>My Notes</ListTitle>
      {notes.length === 0 ? (
        <EmptyState>No notes saved yet.</EmptyState>
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
