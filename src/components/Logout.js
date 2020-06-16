import React from 'react'
import {Redirect} from 'react-router-dom'
function Logout(props){
    props.handleLogOut();
    return(
        <Redirect to={{pathname:"/login"}}/>
    )
}
export default Logout;