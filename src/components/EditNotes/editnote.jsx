import "./editnote.css";
import "../../pages/Home/home.css";
import { useNotes } from "../../contexts/notes-context";
import { useRef } from "react";

// This is the exact same component as the note input with a cancel button

const EditNote = () => {
  const { editNote, dispatchNotes, notesState } = useNotes();

  const { currentEditNote } = notesState;

  //The current edit note is nothing but the modal that pops up

  const textInputRef = useRef();

  const editSubmitFormHandler = (e) => {
    e.preventDefault();
    // console.log(currentEditNote, "done");
    if (currentEditNote.title.trim() || currentEditNote.note.trim()) {
      editNote(currentEditNote); //edit note handler is triggered and the edited note gets posted to backend

      //this gets triggered when we click add note in the modal
      dispatchNotes({
        type: "SET_EDIT_NOTES",
        payload: { Editing: false, currentEditNote: { title: "", note: "" } },
      }); //this sets the edited note in the view after the modal disappears

      // console.log(currentEditNote, "NOTE");
    }
  };

  return (
    <div className="edit-note">
      <div className="note-wrapper">
        <form className="notes-input-form" onSubmit={editSubmitFormHandler}>
          <input
            type="text"
            placeholder="Title"
            value={currentEditNote.title}
            onChange={(e) =>
              dispatchNotes({
                type: "SET_NOTE_VALUES",
                payload: { type: "title", value: e.target.value },
              })
            }
          />
          <textarea
            ref={textInputRef}
            placeholder="Take a note..."
            value={currentEditNote.note}
            onChange={(e) =>
              dispatchNotes({
                type: "SET_NOTE_VALUES",
                payload: { type: "note", value: e.target.value },
              })
            }
          ></textarea>
          <div className="cta-buttons">
            <div className="operations">
              <i class="fa-solid fa-palette operation-btn"></i>
              <i class="fa-solid fa-tags operation-btn-2"></i>
            </div>

            <div>
              <button
                onClick={() =>
                  dispatchNotes({
                    type: "SET_EDIT_NOTES",
                    payload: { Editing: false, currentEditNote: {} },
                  })
                }
                className="notes-btn edit-card"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!currentEditNote.title && !currentEditNote.note}
                className="notes-btn edit-card"
              >
                Save Note
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export { EditNote };
