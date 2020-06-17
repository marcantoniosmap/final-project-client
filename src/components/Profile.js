import React, { useState, useEffect} from 'react';
import Navbar from './Navbar';
import AreYouSure from '../components/AreYouSure';
import { Button, FormGroup, FormControl} from "react-bootstrap";


function Profile(props){

    const [userData,setUserData]= useState({});
    const [editName,setEditName]=useState(false);
    const [name,setName]= useState("");
    const [deleteBox,setDeleteBox]=useState(false);
    const [password,setPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [newPasswordv,setNewPasswordv]=useState("");
    const [changePassword,setChangePassword]=useState(false);
    const [errorMessage,setErrorMessage]=useState("");
    
    function isEmpty(obj){
        for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
              return false;
      }
      return true;
      }

    function handleEdit(){
        if (editName){
            setEditName(false);
            setName("");
        }
        else{
            setEditName(true);
            setName(userData.name);
        }
    }
    function handleSubmit(){
        updateName(userData._id,name);
       
        setEditName(false);
    }

    function handleDeleteBox(){
        setDeleteBox(true);
    }
    function handleDelete(answer){
        setDeleteBox(false);
        if (answer) deleteUser();
    }

    function handleChangePasswordBox(){
        if (changePassword) setChangePassword(false);
        else{
            setChangePassword(true);
        }
    }
    function hanldeChangePassword(){
        if (newPassword===newPasswordv){
            updatePassword(userData._id,password,newPassword);
        }else{
            setErrorMessage("New Password and password does not match");
        }
    }


    async function deleteUser(){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 
                        'auth-token': props.token},
            };
            const response = await fetch(`https://auth.cogether.me/api/user/deleteUser/${userData._id}`, requestOptions);
            const data = await response.json();
            if (!data.status==='ok'){
                console.log('cannot delete projects');
            }else{
                props.handleLogOut();
                props.history.push('/login');
            }
    }
    async function fetchData(id){
        const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 
                    'auth-token': props.token},
        };
        const response = await fetch(`https://auth.cogether.me/api/user/${id}`, requestOptions);
        const data = await response.json();
        setUserData(data);
    }

    async function updateName(id,name){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 
                        'auth-token': props.token},
            body:JSON.stringify({_id:id,name:name})
            };
            const response = await fetch(`https://auth.cogether.me/api/user/update`, requestOptions);
            const data = await response.json();
            fetchData(props.user);
    }

    async function updatePassword(id,password,newPassword){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 
                        'auth-token': props.token},
            body:JSON.stringify({_id:id,password:password,newPassword:newPassword})
            };
            try{
                const response = await fetch(`https://auth.cogether.me/api/user/updatePassword`, requestOptions);
                if (!response.ok){
                    setErrorMessage("Error to change password");
                }else{
                    const data = await response.json();
                    props.handleLogOut();
                    props.history.push('/login');
                    setChangePassword(false);
                }
            }catch(err){
                setErrorMessage("Error to change password");
            }
    }
    useEffect(()=>{
       fetchData(props.user);
    },[]);
    return(
        <div>
            <Navbar {...props}/>
             {!isEmpty(userData) ?
            <div className="container" style={{height:'100vh'}}>
                <div className=" h-100 d-flex justify-content-center align-items-center">
                    {
                        !changePassword ?
                    
                    <div className="card p-3">
                        <div className='card-body'>
                            <h3 className="card-title">Profile</h3>
                            <p className="card-text"><b>Name</b>: {editName? <span><input
                                                                                value ={name}
                                                                                onChange={e=>setName(e.target.value)}/>
                                                                                <button className="btn-info"onClick={handleSubmit}>Apply</button>
                                                                                </span>
                                                                            : userData.name}</p>
                            <p className="card-text"><b>Email </b>: {userData.email}</p>
                            <p className="card-text"><b>Project owned </b>: {userData.project_owner}</p>
                            <p className="card-text"><b>Project collaborated </b>: {userData.project_collab}</p>
                        </div>
                        <div className='card-footer'>
                            <button onClick={handleEdit} className="mx-2 btn-primary btn"> Edit</button>
                            <button onClick ={handleChangePasswordBox}className="mx-2 btn-warning btn"> Change Password</button>
                            <button onClick={handleDeleteBox} className="mx-2 btn-danger btn"> Delete account</button>
                        </div>
                    </div>
                    :
                    <div className="card p-3">
                    <div className='card-body'>
                        <h3 className="card-title">Change Password</h3>
                        <p className="card-title" style={{color:'red'}}>{errorMessage}</p>
                        <form onSubmit={hanldeChangePassword}>
                            
                        <FormGroup controlId="password" >
                                Password
                                <FormControl
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                                />
                        </FormGroup>
                        <FormGroup controlId="newPassword" >
                                New Password
                                <FormControl
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                type="password"
                                />
                        </FormGroup>
                        <FormGroup controlId="newPasswordv" >
                                New Password Confirmation
                                <FormControl
                                value={newPasswordv}
                                onChange={e => setNewPasswordv(e.target.value)}
                                type="password"
                                />
                        </FormGroup>
                        </form>
                    </div>
                    <div className='card-footer'>
                        <button onClick={handleChangePasswordBox} className="mx-2 btn-secondary btn"> cancel</button>
                        <button onClick={hanldeChangePassword}className="mx-2 btn-warning btn"> Change Password</button>
                    </div>
                </div>
                    }   

                </div>
            </div>
        : <div>loading</div>
        }
           {deleteBox && <AreYouSure text={"Are you sure you want to delete account?"} command ={'delete'} handleEvent={handleDelete}/>}
        </div>
    )
}

export default Profile