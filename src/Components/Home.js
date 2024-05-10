import React, { useContext, useState, useEffect } from 'react';
import noteContext from '../context/Notes/NoteContext';
import { useNavigate } from 'react-router-dom';


function Home(props){
    const navigate = useNavigate();
    const {addNote} = useContext(noteContext);
    const[note,setNote] = useState({title: "", description: "", tag: ""});
    function handleChange(event){
        setNote({...note, [event.target.name] : event.target.value})
    }
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login');
        } 
        //eslint-disable-next-line
      }, []);
    function noteAdd(event){
        event.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("success","New Note has been added");
        navigate("/note")
    }

    return (
        <div>
            <div className='container'>
            <h1 className='my-5'>Add a Note</h1>
            <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={handleChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name="description" onChange={handleChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange} minLength={5} required/>
            </div>
            <button type="submit" className="btn btn-dark" onClick={noteAdd}>Add Note</button>
            </form>
            </div>
        </div>
    )
}

export default Home;