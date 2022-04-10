import dayjs from "dayjs";
import { useRef, useState } from "react";
import { EditNote } from "../../components/EditNotes/editnote";
import { NotesList } from "../../components/NoteList/notelist";
import { useNotes } from "../../contexts/notes-context";
import "./home.css";

const initialData = { title: "", note: "" };
const dateFormat = () => dayjs().format("DD/MM/YY hh:mm:ss a");

const Home = () => {
  const [input, setInput] = useState(initialData);
  const textInputRef = useRef(null); // we do this so that it doesn't get lost on re-render. We then pass this as a prop below to the value we want to persist on re-render.

  const {
    addNewNote,
    notesState: { Editing },
  } = useNotes();

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (input.title.trim() || input.note.trim()) {
      // we can also choose to trim from either ends //if any of this is true, create a note using the addnewNote function
      addNewNote({ ...input, createdAt: dateFormat() });
      setInput(initialData); //after adding note, the space should clear again
    }
  };

  //THIS IS NOTE INPUT
  return (
    <>
      {/* We put the edit note component here as we want it to appear on the home page */}
      {Editing ? <EditNote /> : null}

      <div className="main-wrapper">
        <div className="note-wrapper">
          <form className="notes-input-form" onSubmit={submitFormHandler}>
            <input
              type="text"
              placeholder="Title"
              value={input.title}
              onChange={(e) =>
                setInput((previous) => ({ ...previous, title: e.target.value }))
              }
            />

            <textarea
              ref={textInputRef}
              placeholder="Take a note..."
              value={input.note}
              onChange={(e) =>
                setInput((previous) => ({ ...previous, note: e.target.value }))
              }
            ></textarea>
            <div className="cta-buttons">
              <div className="operations">
                <i class="fa-solid fa-palette operation-btn"></i>
                <i class="fa-solid fa-tags operation-btn-2"></i>
              </div>

              <button
                type="submit"
                disabled={!input.title && !input.note}
                className="notes-btn"
              >
                Add Note
              </button>
            </div>
          </form>
        </div>

        {/* The NOTESLIST component */}
        <NotesList />
      </div>
    </>
  );
};

export { Home };
