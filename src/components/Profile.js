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

    async function fetchData(){
        const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 
                    'auth-token': props.token},
        };
        const response = await fetch('http://CogetherAuth-env.eba-3vhu2w8q.ap-southeast-1.elasticbeanstalk.com/api/user', requestOptions);
        const data = await response.json();
        setUserData(data);
    }
    useEffect(()=>{
       fetchData();
    },[]);
    return(
        <div>
            <Navbar {...props}/>
            {isEmpty(userData)? <div>Loading</div>
            :
            <div className="container">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"/> 
                <p>{userData.name}</p>
            </div>
            }

        </div>
    )
}

export default Profile