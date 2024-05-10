import React, { useState,useContext, useEffect, useRef } from "react";
import noteContext from "../context/Notes/NoteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

function YourNote(props) {
    const[note,setNote] = useState({etitle: "", edescription: "",etag: ""});
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  const [currentId, setCurrentId] = useState("");
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    } else{
      navigate('/login');
    }
    //eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const ref2 = useRef(null);
  function updateNote(currentnote) {
    setCurrentId(currentnote._id);
    ref.current.click();
    setNote({etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag});
    
  }
  function handleChange(event){
    event.preventDefault();
    setNote({...note, [event.target.name]: event.target.value});
  }
  function noteAdd(event){
    event.preventDefault();
    editNote(currentId,note.etitle,note.edescription,note.etag);
    ref2.current.click();
    navigate("/note");
    props.showAlert("dark","Note edited Successfully");
  }
  return (
    <>
      <button
        type="button"
        ref = {ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref ={ref2}
              />
            </div>
            <div className="modal-body">
            <form onSubmit={noteAdd}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChange} minLength={5} required/>
            </div>
            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="submit" className="btn btn-dark">Add Note</button>
            </form>
            </div>
          </div>
        </div>
      </div>
      <h1 className="my-5"> Hey! Checkout your Notes here</h1>
      <div className="row">
      <div className = "container">{notes.length === 0 && "NO notes to display"} </div>
        {notes.map((element) => {
          return (
            <NoteItem
              key={element._id.toString()}
              updateNote={updateNote}
              note={element}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
}

export default YourNote;
