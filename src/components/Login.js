import React, { useState } from "react";
import { Button, FormGroup, FormControl} from "react-bootstrap";
import {Link} from 'react-router-dom';
import "../stylesheet/login.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login,setLogin]= useState(false);
  const [store,setStore]= useState("");


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function storeCollector(){
    let store = JSON.parse(localStorage.getItem('login'));
    if(store && store.login){
      setLogin(true);
      setStore(store);
    }
  }
  function logout(){
    setLogin(false);
    setStore("");
    localStorage.removeItem("login");
  }


  async function handleSubmit (event){
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password:password})
    };
    console.log(email,password);
    console.log(requestOptions);
    console.log('hai its me mario');
    const response = await fetch('CogetherAuth-env.eba-3vhu2w8q.ap-southeast-1.elasticbeanstalk.com/api/user/login', requestOptions);
    const data = await response.json();
    
    localStorage.setItem('login', JSON.stringify({
      login:true,
      token: data.token,
      id:data.id
    }))
    storeCollector();
    props.handleSucessfulAuth(data);
    props.history.push('/');

  }


  return (
      <div className="container-fluid height-max">
      <div className="row h-100">
        <div className="col-lg-6 p-0 overflow-none d-lg-block d-none">
          <img src="login.gif" className="h-100"/>
        </div> 
        <div className=" col-lg-6 d-flex justify-content-center align-items-center">
          <div className="Login px-5">
          <h1 className="text-center">Cogether</h1>
        
          <p className="text-center">You are {props.loggedInStatus}</p>
            <form onSubmit={handleSubmit}>
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
              <Button block disabled={!validateForm()} type="submit">
                Login
              </Button>
            </form>
            <p><small>Doesn't have an account? <Link to ="/register">Register here</Link></small></p>
        </div>
      </div>
      </div>
      <div>
  </div>
    </div>
  );
}