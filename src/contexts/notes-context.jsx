import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useAuth } from "./auth-context";
import axios from "axios";

const NotesContext = createContext(null);

function notesReducer(notesState, { type, payload }) {
  switch (type) {
    case "ADD_NEW_NOTE":
      return { ...notesState, notesList: payload.notesList };

    case "INITIAL_RENDER_NOTES":
      return { ...notesState, notesList: payload.notesList };

    case "EDIT_NOTES":
      return { ...notesState, notesList: payload.notesList };

      //for editing the note after it has been created

      case "SET_EDIT_NOTES":
        return {...notesState, Editing: payload.Editing, currentEditNote: payload.currentEditNote};

      case "SET_NOTE_VALUES":
        return {...notesState, currentEditNote: {...notesState.currentEditNote, [payload.type]: payload.value}};
    default:
      return notesState;
  }
}

function NotesProvider({ children }) {
  const {
    auth: { token },
  } = useAuth();

  ///reducer logic will come here

  const [notesState, dispatchNotes] = useReducer(notesReducer, {
    notesList: [],
    archivedList: [],
    Editing: false,
    currentEditNote: { title: "", note: "" },
  });

  // Initial render to get notes from backend

  useEffect(() => {
    if (token) {
      (async function () {
        try {
          const { status, data } = await getNotesItem(token);
          if (status === 200) {
            dispatchNotes({
              type: "INITIAL_RENDER_NOTES",
              payload: { notesList: data.notes },
            });
          }
        } catch (err) {
          console.log(err);
        }
      })(); //IIFE
    }
  }, []);

  //service

  function getNotesItem(token) {
    return axios.get("/api/notes", { headers: { authorization: token } });
  }

  //function for adding a new note

  function addNewNote(newNote) {
    if (token) {
      (async function () {
        try {
          const { status, data } = await postNewNote({ newNote, token });

          if (status === 201) {
            dispatchNotes({
              type: "ADD_NEW_NOTE",
              payload: { notesList: data.notes },
            });
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }

  //service

  function postNewNote({ newNote, token }) {
    return axios.post(
      "/api/notes",
      { note: newNote },
      { headers: { authorization: token } }
    );
  }

  //function to editnote

  function editNote(currentNote) {
    if (token) {
      (async function () {
        try {
          const { status, data } = await editNoteServices({ currentNote, token });

          if (status === 201) {
            dispatchNotes({
              type: "EDIT_NOTES",
              payload: {
                notesList: data.notes,
              },
            });
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }

  //service

  function editNoteServices({ currentNote, token }) {
    return axios.post(
      `/api/notes/${currentNote._id}`,
      { notes: currentNote },
      { headers: { authorization: token } }
    );
  }

  return (
    <NotesContext.Provider value={{ dispatchNotes, addNewNote, editNote, notesState }}>
      {children}
    </NotesContext.Provider>
  );
}

const useNotes = () => useContext(NotesContext);

export { useNotes, NotesProvider };
