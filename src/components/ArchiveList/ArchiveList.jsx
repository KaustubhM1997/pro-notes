import { useNotes } from "../../contexts/notes-context";
import { NoteCard } from "../NoteCard/notecard";
import "./ArchivedList.css";
const ArchivedList = () => {
  const {
    notesState: { archivedList },
  } = useNotes();

  console.log(archivedList, "archived is here!");

  return (
    <div className="archived-list-container">
      {archivedList.map((eachNote) => {
        return <NoteCard key={eachNote._id} noteProp={eachNote} />;
      })}
    </div>
  );
};

export { ArchivedList };
