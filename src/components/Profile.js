import React, { useState, useEffect} from 'react'
import Navbar from './Navbar'

function Profile(props){

    const [userData,setUserData]= useState({})

    function isEmpty(obj){
        for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
              return false;
      }
      return true;
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
    useEffect(()=>{
       fetchData(props.user);
    },[]);
    return(
        <div>
            <Navbar {...props}/>
             {!isEmpty(userData) ?
            <div className="container" style={{height:'100vh'}}>
                <div className=" h-100 d-flex justify-content-center align-items-center">
                    <div className="card p-3">
                        <div className='card-body'>
                            <h3 className="card-title">Profile</h3>
                            <p className="card-text"><b>Name</b>: {userData.name}</p>
                            <p className="card-text"><b>Email </b>: {userData.email}</p>
                            <p className="card-text"><b>Project owned </b>: {userData.email}</p>
                            <p className="card-text"><b>Project collaborated </b>: {userData.email}</p>
                        </div>
                        <div className='card-footer'>
                            <button className="mx-2 btn-primary btn"> Edit</button>
                            <button className="mx-2 btn-warning btn"> Change Password</button>
                            <button className="mx-2 btn-danger btn"> Delete account</button>
                        </div>
                    </div>
                </div>
            </div>
        : <div>loading</div>
        }
            {/* !projectId ? <div>loading</div>:<Redirect to={{pathname:`/project/${projectId}`}}/> */}
        </div>
    )
}

export default Profile