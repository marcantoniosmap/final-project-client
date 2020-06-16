import React from 'react';
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom';
import Editor from './components/Editor';
import Project from './components/Project';
import Logout from './components/Logout'
import Login from './components/Login';
import Register from './components/Register';
import Upload from './components/Upload';
import Create from './components/Create'
import Profile from './components/Profile'
import Auth from './components/Auth';
import Collab from './components/Collab';
// import {Resizable,ResizableBox} from 'react-resizable';
import "./stylesheet/resizable.css";
function App() {


  const auth = new Auth();

  function handleSucessfulAuth(data){
    auth.setToken(data.token);
    auth.setUserId(data.id);
    auth.authenticate();
  }
  function handleLogOut(){
    auth.signout();
  }


  return (
    <Router>
      <Switch>
        <Route 
          path ="/" 
          exact
          render={props=> auth.getAuth()? 
            <Project {...props} activeLink="project" user={auth.userId} handleLogOut={handleLogOut}token={auth.getAuthToken()}/>
            :<Redirect to={{pathname:"/login"}}/>} 
          />
        <Route 
          path ="/login"
          render={props=>(
            <Login {...props} loggedInStatus={auth.getAuthToString()} handleSucessfulAuth={handleSucessfulAuth}/>
        )} />
        <Route 
          path ="/logout"
          render={props=>(
            <Logout {...props} handleLogOut={handleLogOut}/>
        )} />
        <Route path ="/register"
          render={props=>(
              <Register {...props}/>

          )}/>
        <Route 
          path ="/project/:id/"
          render={props=>auth.getAuth()?
            <Editor {...props} handleLogOut={handleLogOut} token={auth.getAuthToken()}/>
            :<Redirect to={{pathname:"/login"}}/>}/>
        <Route
          path ="/create"
          render ={props=>(auth.getAuth()? 
            <Create {...props} activeLink="create" token={auth.getAuthToken()}/>
            : <Redirect to={{pathname:"/login"}}/>
          )}/>
        <Route
          path ="/profile"
          render ={props=>(auth.getAuth()? 
            <Profile {...props} activeLink="profile" token={auth.getAuthToken()}/>
            : <Redirect to={{pathname:"/login"}}/>
            )}
          />
          <Route
          path ="/collab/:id/:password/"
          render ={props=>(auth.getAuth()? 
            <Collab  {...props} user={auth.userId}token={auth.getAuthToken()}/>
            : <Redirect to={{pathname:"/login"}}/>
            )}
          />
      </Switch>

    </Router>
  );
}

export default App;
