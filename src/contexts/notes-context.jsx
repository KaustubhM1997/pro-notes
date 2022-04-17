import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./auth-context";
import axios from "axios";

const NotesContext = createContext(null);

function notesReducer(notesState, { type, payload }) {
  switch (type) {
    case "ADD_NEW_NOTE":
      return { ...notesState, notesList: payload.notesList };

    case "INITIAL_RENDER_NOTES":
      return { ...notesState, notesList: payload.notesList };

    case "SET_NOTES":
      return { ...notesState, notesList: payload.notesList }; //This sets the notes in note card to be edited later using set_edit_notes

    //for editing the note after it has been created and forms a modal

    case "SET_EDIT_NOTES":
      return {
        ...notesState,
        Editing: payload.Editing,
        currentEditNote: payload.currentEditNote,
      };

    case "SET_NOTE_VALUES":
      return {
        ...notesState,
        currentEditNote: {
          ...notesState.currentEditNote,
          [payload.type]: payload.value, //we dynamically set the type as there are two different types of payloads and then we get the corresponding values
        },
      }; // we destructure payload.type from notesState.currenteditnote as there are multiple types (title and notes) and then pass the value

    case "GET_ARCHIVES":
      return { ...notesState, archivedList: payload.archivedList };

    case "RESTORE_MOVETO_ARCHIVED_NOTES":
      return {
        ...notesState,
        noteList: payload.noteList,
        archivedList: payload.archivedList,
      };
    default:
      return notesState;
  }
}

function NotesProvider({ children }) {
  const {
    auth: { token },
  } = useAuth();

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
          console.error(err);
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
              payload: { notesList: data.notes }, // we add it to the notelist and later map the notelist to show all the notes
            });
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }

  //service

  function postNewNote({ newNote, token }) {
    return axios.post(
      "/api/notes",
      { note: newNote }, //note is the predefined key
      { headers: { authorization: token } }
    );
  }

  //function to editnote

  function editNote(currentNote) {
    console.log(currentNote, "here"); // the currentedit note from the editnote component appears here and gets posted to the server

    if (token) {
      (async function () {
        try {
          console.log(token);
          const { status, data } = await editNoteServices(currentNote, token);

          console.log(data, "hi");
          console.log(status, "neog");

          if (status === 201) {
            console.log("cominh");
            dispatchNotes({
              type: "SET_NOTES",
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

  function editNoteServices(currentNote, token) {
    // console.log(currentNote, "from ser");
    console.log(currentNote._id, "id");
    console.log("bug resolved");
    return axios.post(
      `/api/notes/${currentNote._id}`,
      { note: currentNote },
      { headers: { authorization: token } }
    );
  }

  //Initial render to get archived notes from backend

  useEffect(() => {
    if (token) {
      (async function () {
        try {
          const { status, data } = await getArchivedNotes(token); //we store the archived notes in terms of status and data

          if (status === 200) {
            dispatchNotes({
              type: "ARCHIVES_FROM_BACKEND",
              payload: { archivedList: data.archives },
            });

            // console.log(data.archives, "list");
          }
        } catch (error) {
          console.error(err);
        }
      })(); //IIFE
    }
  }, []);

  //service

  function getArchivedNotes(token) {
    return axios.get("/api/archives", {
      headers: {
        authorization: token,
      },
    });
  }

  async function restoreArchivedNote(e, currentNote) {
    e.stopPropagation(); //this prevents the same event from happening again

    if (token) {
      try {
        const { status, data } = await restoreNoteFromArchives({
          token,
          currentNote,
        });

        if (status === 200) {
          dispatchNotes({
            type: "RESTORE_MOVETO_ARCHIVED_NOTES",
            payload: { noteList: data.notes, archivedList: data.archives },
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  //service

  //here in post request, we post the note to notelist from archivedlist, which makes the archivedlist empty, hence we pass the second parameter as an empty object

  function restoreNoteFromArchives({ token, currentNote }) {
    return axios.post(
      `/api/archives/restore/${currentNote._id}`,
      {},
      {
        headers: { authorization: token },
      }
    );
  }

  //function to move note to ArchivedList

  async function moveToArchives(e, currentNote) {
    e.stopPropagation();

    if (token) {
      try {
        const { status, data } = await moveNoteToArchive({
          token,
          currentNote,
        });

        console.table(status, data, "yipee");

        if (status === 200) {
          dispatchNotes({
            type: "RESTORE_MOVETO_ARCHIVED_NOTES",
            payload: { noteList: data.notes, archivedList: data.archives},
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  // service

  function moveNoteToArchive({token, currentNote}) {
    return axios.post(
      `/api/notes/archives/${currentNote._id}`,
      {

        note: currentNote
      },
      {
        headers: { authorization: token },
      }
    );
  }

  return (
    <NotesContext.Provider
      value={{
        dispatchNotes,
        addNewNote,
        editNote,
        notesState,
        restoreArchivedNote,
        moveToArchives,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

const useNotes = () => useContext(NotesContext);

export { useNotes, NotesProvider };
