import React, { useState} from "react";
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const [details, setDetails] = useState({name: "", email: "", password: "", cpassword: ""});
    let navigate = useNavigate();
    async function handleSubmit(event){
        if(details.password === details.cpassword){
            const host = "http://localhost:5000";
            event.preventDefault();
            const url = `${host}/api/auth/createuser`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({name: details.name,email: details.email, password: details.password}),
            });
            const json = await response.json();
            if(json.success){
                // Save the token and redirect
                localStorage.setItem('token', json.authToken);
                props.showAlert("danger","Account created successfully");
                navigate("/note");
            } else{
                props.showAlert("danger","Invalid Credentials");
            }
    } else{
        alert("Passwords are not matching");
    }
    }
    function handleChange(event){
        setDetails({...details, [event.target.name]: event.target.value});
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-5 form-group">
          <label hmtlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            name="name"
            value={details.name}
            onChange={handleChange}
          />
          </div>
        <div className="form-group">
          <label hmtlFor="name">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={details.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label hmtlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            value={details.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label hmtlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="Password"
            name="cpassword"
            value={details.cpassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="my-2 btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default Signup;
