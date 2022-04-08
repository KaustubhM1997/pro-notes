import "./editnote.css";
import "../../pages/Home/home.css";
import { useNotes } from "../../contexts/notes-context";

const EditNote = () => {

   const {editNote, dispatchNotes, notesState: {currentEditNote}} = useNotes();


   const editSubmitFormHandler = (e) => {
     e.preventDefault();
     if(currentEditNote.title.trim() || currentEditNote.note.trim()){
       editNote(currentEditNote) //edit note handler
       dispatchNotes({type: "SET_EDIT_NOTES", payload: {Editing: false, currentEditNote: {title: "", note: ""}} });
     }


   }

  return (
    <div className="main-wrapper">
      <div className="note-wrapper">
        <form className="notes-input-form" onSubmit={editSubmitFormHandler}>
          <input
            type="text"
            placeholder="Title"
            value={currentEditNote.title}
            onChange={(e) =>
             dispatchNotes({type: "SET_NOTE_VALUES", payload: {type: "title", value: e.target.value}})
            }
          />
          <textarea
            ref={textInputRef}
            placeholder="Take a note..."
            value={currentEditNote.note}
            onChange={(e) =>
              dispatchNotes({type: "SET_NOTE_VALUES", payload: {type: "note", value: e.target.value}})
            }
          ></textarea>
          <div className="cta-buttons">
            <div className="operations">
              <i class="fa-solid fa-palette operation-btn"></i>
              <i class="fa-solid fa-tags operation-btn-2"></i>
            </div>

            <>
              <button
              onClick={() => dispatchNotes({type: "SET_EDIT_NOTES", payload: {Editing: false, currentEditNote: {}}})}
             
              className="notes-btn"
              
              >Cancel</button>

              <button
                type="submit"
                disabled={!currentEditNote.title && !currentEditNote.note}
                className="notes-btn"
              >
                Add Note
              </button>
            </>
          </div>
        </form>
      </div>
    </div>
  );
};

export { EditNote };
