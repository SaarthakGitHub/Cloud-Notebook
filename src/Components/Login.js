import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();
    async function handleSubmit(event){
        const host = "http://localhost:5000";
        event.preventDefault();
        const url = `${host}/api/auth/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
        });
        const json = await response.json();
        if(json.success){
            // Save the token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("warning", "User Loggedin Successfully")
            navigate("/note");
        } else{
          props.showAlert("warning", "Invalid User Details")
        }
    }

    function handleChange(event){
        setCredentials({...credentials, [event.target.name]: event.target.value});
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value = {credentials.password}
            onChange = {handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default Login;
