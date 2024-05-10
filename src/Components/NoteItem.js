import React, { useContext } from "react";
import noteContext from "../context/Notes/NoteContext";

function NoteItem(props) {
  const { note, updateNote, showAlert } = props;
  const { deleteNote } = useContext(noteContext);
  return (
    <>
      <div className="card col-md-4 mx-2 my-2 w-25">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-pencil" onClick={()=>{updateNote(note)}}></i>
          &nbsp;&nbsp;
          &nbsp;&nbsp;
          <i className="fa-solid fa-trash" onClick={()=> {deleteNote(note._id); showAlert("primary","Note successfully deleted")}}></i>
          {/* eslint-disable-next-line */}
          
        </div>
      </div>
    </>
  );
}

export default NoteItem;
