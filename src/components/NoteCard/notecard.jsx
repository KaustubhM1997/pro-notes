import { useNotes } from "../../contexts/notes-context";
import "../../pages/Home/home.css";
import "./notecard.css";

const NoteCard = ({ noteProp }) => {
  const { title, note, createdAt } = noteProp;
  const { dispatchNotes, notesState: {archivedList}, restoreArchivedNote, moveToArchives } = useNotes();


  //we store all the notes that are in archives in here by comparing the current note id to the id of the note in archives

  const noteInArchives = archivedList.find((eachNote) => eachNote._id === noteProp._id);


  return (
    <div
      className="main-note-card-wrapper"
      onClick={() =>
        dispatchNotes({
          type: "SET_EDIT_NOTES",
          payload: { Editing: true, currentEditNote: noteProp },
        })
      }
    >
      {/* This creates the modal. We set the editing to true here which was initialized with false and then the currentedited note which was initialized with empty strings gets the same things as this notescard from the prop.  */}

      {/* From here we go to the edit note component */}
      <div className="note-card-content-wrapper">
        <div className="note-card-row1">
          <div className="note-card-title-pin">
            <div className="notes-title">{title}</div>
            <button title="Pin note" className="pinned-note">
              <i class="fa-solid fa-map-pin"></i>
            </button>
          </div>
        </div>

        <div className="notes-text">{note}</div>
      </div>

      <div className="note-card-footer">
        <span>{createdAt}</span>
        <div className="note-card-cta-buttons">
          <i title="Add color" class="fa-solid fa-palette note-card-btn"></i>
          <i title="Add a label" class="fa-solid fa-tags note-card-btn"></i>

          {/* noteprop consists of the current note(s) from notelist */}
          <i

          onClick={(e) => noteInArchives ? restoreArchivedNote(e, noteProp): moveToArchives(e, noteProp)}
            title="Archive note"
            class="fa-solid fa-box-archive note-card-btn"
          ></i>
          <i title="Move to Trash" class="fa-solid fa-trash note-card-btn"></i>
        </div>
      </div>
    </div>
  );
};

export { NoteCard };
