import { useNotes } from "../../contexts/notes-context";
import "../../pages/Home/home.css";
import "./notecard.css";

const NoteCard = ({ noteProp }) => {
  const { title, note, createdAt } = noteProp;
  const { dispatchNotes } = useNotes();

  return (
    <div className="main-note-card-wrapper" onClick={() => dispatchNotes({type: "SET_EDIT_NOTES", payload: {Editing: true, currentEditNote: noteProp}})}>
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
          <i title="Archive note" class="fa-solid fa-box-archive note-card-btn"></i>
          <i title="Move to Trash" class="fa-solid fa-trash note-card-btn"></i>
        </div>
      </div>
    </div>
  );
};

export { NoteCard };
