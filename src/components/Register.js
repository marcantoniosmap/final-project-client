import React, { useState } from "react";
import { Button, FormGroup, FormControl} from "react-bootstrap";
import "../stylesheet/login.css";
import {Link} from 'react-router-dom';
import $ from 'jquery';

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify]=useState("");
  const [name,setName]= useState("");
  const [valid,setValid]= useState(false);

  function validateForm() {
    return name.length> 0 && email.length > 0 && password.length > 0;
  }
  function checkPassword(passwordV){
    setPasswordVerify(passwordV)
    $('#passwordVerify').addClass('redBorder');
    if (passwordV=== password ){
      setValid(true);
      $('#passwordVerify').removeClass('redBorder');
    }
  }

  async function handleSubmit (event){
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name:name, email: email, password:password})
    };
    const response = await fetch('http://localhost:8000/api/user/register', requestOptions);
    const data = await response.json();
    console.log(data);

    try{
      if (data.status==='success'){
        props.history.push('/login');
      }
        else{
          console.log("error else");
          alert(data);
        }
      
  }catch(err){
    console.log("error catch");
    alert(err);
  }


  }


  return (
    <div className="container-fluid height-max">
      <div className="row h-100">
        <div className="col-lg-6 p-0 overflow-none">
          <img src="login.gif" className="h-100"/>
        </div> 
        <div className=" col-lg-6 d-flex justify-content-center align-items-center">
          <div className="Login px-5">
          <h1 className="text-center">Cogether</h1>
          <p className="text-center">Register today for free, forever!</p>
            <form onSubmit={handleSubmit}>
            <FormGroup controlId="name">
                Name
                <FormControl
                  autoFocus
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="email">
                Email
                <FormControl
                  autoFocus
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="password" >
                Password
                <FormControl
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                />
              </FormGroup>
              <FormGroup controlId="passwordVerify">
                Verify Your Password
                <FormControl
                  className='redBorder'
                  value={passwordVerify}
                  onChange={e => checkPassword(e.target.value)}
                  type="password"
                />
              </FormGroup>
              <Button block disabled={!validateForm()} type="submit">
                Register Now
              </Button>
            </form>
            <p><small>Already have an account? <Link to ="/login">Click here</Link> to login</small></p>


        </div>
      </div>
      </div>
    </div>
  );
}