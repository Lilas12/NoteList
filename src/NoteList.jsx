function NoteList({ notes, onDeleteNote, onEditNote }) {
  return (
    <div className="list-wrapper">

      <h3 className="list-title">My Notes</h3>

      {notes.length === 0 ? (
        <p className="empty-state">No notes saved yet. Add one above! ✨</p>
      ) : (
        notes.map(note => (

          <div className="note-card" key={note.id}>

            <div className="text-content">
              <h4 className="note-title">{note.title}</h4>
              <p className="note-description">{note.description}</p>
            </div>

            <div className="button-container">
              <button
                className="action-button edit-button"
                onClick={() => onEditNote(note)}
              >
                Edit
              </button>
              <button
                className="action-button delete-button"
                onClick={() => onDeleteNote(note.id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default NoteList;
