import Navbar from './Components/Navbar.js';
import Home from './Components/Home.js';
import YourNote from './Components/YourNote.js';
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import NoteState from './context/Notes/NoteState.js';
import { Alert } from './Components/Alert.js';
import { useState } from 'react';

function App() {
  const [alert,setAlert] = useState(null);
  function showAlert(type, message){
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  }
  return (

    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert = {alert}/>
    <div className="container">
      <Routes>
        <Route exact path='/' element={<Home showAlert={showAlert}/>}/>
        <Route exact path='/home' element={<Home showAlert={showAlert}/>}/>
        <Route exact path='/note' element={<YourNote showAlert={showAlert}/>}/>
        <Route exact path='/login' element={<Login showAlert={showAlert}/>}/>
        <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}/>
      </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
