import { useNotes } from "../../contexts/notes-context";
import "./notelist.css";
import { NoteCard } from "../NoteCard/notecard";

const NotesList = () => {
  const {
    notesState: { notesList },
  } = useNotes(); //destructuring the noteslist from initial state in context

  return (
    <>
      {/* All the notes that get created are stored in noteslist and they get mapped here */}
      <div className="note-list-wrapper">
        {notesList?.map((newNote) => {
          return <NoteCard key={newNote._id} noteProp={newNote} />; //we create a notecard for the data to be displayed when a note is created.
        })}
      </div>
    </>
  );
};

export { NotesList };
