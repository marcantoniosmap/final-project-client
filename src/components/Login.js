import React, { useState ,useEffect} from "react";
import { Button, FormGroup, FormControl} from "react-bootstrap";
import {Link} from 'react-router-dom';
import "../stylesheet/login.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login,setLogin]= useState(false);
  const [store,setStore]= useState("");
  const [errorMessage,setErrorMessage]=useState(false);


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
  useEffect(function() {
   console.log("mounted");
    
    return function cleanup() {
      console.log("unmounted");
    }
  }, []);

  async function handleSubmit (event){
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password:password})
    };
    try{
      const response = await fetch('https://auth.cogether.me/api/user/login', requestOptions);
      if(response.ok){
        const data = await response.json();
        localStorage.setItem('login', JSON.stringify({
          login:true,
          token: data.token,
          id:data.id
        }));
        storeCollector();
        props.handleSucessfulAuth(data);
        props.history.push('/');
      }
      else{
        setErrorMessage('Error in logging in');
      }
    }catch(err){
      setErrorMessage('Error in logging in');
    }
    

  }


  return (
      <div className="container-fluid height-max">
      <div className="row h-100">
        <div className="col-lg-6 p-0 overflow-none d-lg-block d-none">
          <img src="login.gif" className="h-100"/>
        </div> 
        <div className=" col-lg-6 d-flex justify-content-center align-items-center">
          <div className="Login px-5">
          <h1 className="text-center"> <img src="logo.png" style={{maxWidth:'55px'}}/>Cogether</h1>
          {
            !errorMessage ?
            <p className="text-center">Code together, forever </p>
            : 
            <p className="text-center" style={{color:'red'}}>{errorMessage}</p>

          }
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