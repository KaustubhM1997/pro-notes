import dayjs from "dayjs";
import { useRef, useState } from "react";
import { NotesList } from "../../components/NoteList/notelist";
import { useNotes } from "../../contexts/notes-context";
import "./home.css";


const initialData = {title: "", note: ""};
const dateFormat = () => dayjs().format("DD/MM/YY hh:mm:ss a");



const Home = () => {


  const [input, setInput] = useState(initialData);
  const textInputRef = useRef(null);

  const {addNewNote} = useNotes();
 
 
  const submitFormHandler = (e) => {
 
   e.preventDefault();
   if(input.title.trim() || input.note.trim()){
 
     addNewNote({...input, createdAt: dateFormat()});
     setInput(initialData); //after adding, the space should clear again
   }
  }

 

 //THIS IS NOTE INPUT
  return (
    <div className="main-wrapper">
    <div className="note-wrapper">
      <form className="notes-input-form" onSubmit = {submitFormHandler}>
        <input type="text" placeholder="Title" value={input.title} onChange = {(e) => setInput((prev) => ({...prev, title: e.target.value}))  }  />

        <textarea ref = {textInputRef} placeholder="Take a note..." value = {input.note} onChange = {(e) => setInput((prev) => ({...prev, note: e.target.value}))}></textarea>
        <div className="cta-buttons">
          <div className="operations">
            <i class="fa-solid fa-palette operation-btn"></i>
            <i class="fa-solid fa-tags operation-btn-2"></i>
          </div>

            <button type="submit" disabled = {!input.title && !input.note} className="notes-btn">Add Note</button>
          
        </div>
      </form>
    </div>
    <NotesList/>
  </div>
  );
};

export { Home };
