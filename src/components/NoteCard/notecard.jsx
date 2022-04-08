import { useNotes } from "../../contexts/notes-context";
import "../../pages/Home/home.css";
import "./notecard.css";

const NoteCard = ({ noteProp }) => {
  const { title, note, createdAt } = noteProp;
  const { dispatchNotes } = useNotes();

  return (
    <div className="main-note-card-wrapper">
      <div className="note-card-content-wrapper">
        <>
          <div className="notes-title">{title}</div>
          <div className="notes-text">{note}</div>
        </>

        <button className="pinned-note">
          <i class="fa-solid fa-map-pin"></i>
        </button>
      </div>

      <div className="note-card-footer">
        <span>{createdAt}</span>
        <div className="note-card-cta-buttons">
          <i class="fa-solid fa-palette operation-btn"></i>
          <i class="fa-solid fa-tags operation-btn-2"></i>
          <i class="fa-solid fa-box-archive operation-btn"></i>
          <i class="fa-solid fa-trash operation-btn"></i>
        </div>
      </div>
    </div>
  );
};

export { NoteCard };
