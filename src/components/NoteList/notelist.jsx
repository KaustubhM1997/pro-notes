import { useNotes } from "../../contexts/notes-context";
import "./notelist.css";
import { NoteCard } from "../NoteCard/notecard";

const NotesList = () => {
  const {
    notesState: { notesList },
  } = useNotes();

  return (
    <>
      <div className="note-list-wrapper">
        {notesList?.map((newNote) => {
          return <NoteCard key={newNote._id} noteProp={newNote} />;
        })}
      </div>
    </>
  );
};

export { NotesList };
