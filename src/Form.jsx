import { useState, useEffect } from "react";
import "./App.css";
import React from 'react'

export default function Form() {
    const initialValues = { username: "",phoneno:"" ,email: "", password: "", confirmpassword:"" };
    const [valuesInput, setValuesInput] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
  
    const changeFunc = (e) => {
      const { name, value } = e.target;
      setValuesInput({ ...valuesInput, [name]: value });
    };
  
    const submitForm = (e) => {
      e.preventDefault();
      setFormErrors(validate(valuesInput));
      setIsSubmit(true);
    };
  
    useEffect(() => {
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(valuesInput);
      }
    }, [formErrors]);
    const validate = (values) => {
      const errors = {};
      const regexemail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      // const regexpass =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!values.username) {
        errors.username = "Username is required!";
      }
       if(!values.phoneno){
        errors.phoneno="Phone No is Required!";
      }
      if((values.phoneno).length<10 || (values.phoneno).length>10){
        errors.phoneno="Enter the correct number";
      }
      if (!values.email) {
        errors.email = "Email is required!";
      } if (!regexemail.test(values.email)) {
        errors.email = "This is not a valid email format!";
      }
      if (!values.password) {
        errors.password = "Password is required!";
      }
      if (!values.confirmpassword) {
        errors.confirmpassword = "Confirm Password is required!";
      } else if(values.password!==values.confirmpassword){
        errors.confirmpassword="Password did not match!";
      }
      else if (values.password.length < 5) {
        errors.password = "Password must be more than 4 characters";
      } else if (values.password.length > 14) {
        errors.password = "Password cannot exceed more than 10 characters";
      } 
      
      return errors;
    };

  
    return (
      
      <div className="container">
  
       
         {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success">Signed in successfully</div>
        ) : (
          <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
        )}  */}


  
        <form onSubmit={submitForm}>
          <h1>Input Form</h1>
          <div className=" divider"></div>
          <div className=" form">
            <div className="field">
              <label>Username:</label>
              <input
              autoComplete="off"
                type="text"
                name="username"
                placeholder="Username"
                value={valuesInput.username}
                onChange={changeFunc}
              />
            </div>
            <p>{formErrors.username}</p>
            <div className="field">
              <label>Phone No:</label>
              <input
                type="number"
                name="phoneno"
                placeholder="Phone Number"
                value={valuesInput.phoneno}
                autoComplete="off"
                onChange={changeFunc}
              />
            </div>
            <p>{formErrors.phoneno}</p>
            <div className="field">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                placeholder="Email:"
                value={valuesInput.email}
                autoComplete="off"
                onChange={changeFunc}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="field">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={valuesInput.password}
                autoComplete="off"
                onChange={changeFunc}
              />
            </div>
            <p>{formErrors.password}</p>
            <div className="field">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                autoComplete="off"
                value={valuesInput.confirmpassword}
                onChange={changeFunc}
              />
            </div>
         <p>{formErrors.confirmpassword}</p>
            <button className="btn-submit">Submit</button>
          </div>
        </form>
      </div>
    );
}
