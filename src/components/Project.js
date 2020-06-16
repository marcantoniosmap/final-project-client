import React, { useEffect, useState } from 'react';
import ProjectList from './ProjectList'
import Navbar from './Navbar';
import {DropdownButton,Dropdown} from 'react-bootstrap'

function Project(props){
    const [load,setLoad]=useState(false);
    const [projects,setProjects]= useState();
    const [sortedBy,setSortedBy]=useState();

    function reFetch(){
        fetchData();
    }
    function sortFunc(){
        projects.sort((a,b)=>
            (a.projectType>b.projectType) ? 1:-1
        )
    }


    async function fetchData(){
        const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 
                    'auth-token': props.token},
        };
        try{
            const response = await fetch('CogetherAuth-env.eba-3vhu2w8q.ap-southeast-1.elasticbeanstalk.com/api/userProject', requestOptions);
            const data = await response.json();
            data.sort((a,b)=>(a.projectType>b.projectType) ? 1:-1);
            setProjects(data);
            setLoad(true);
        }catch(err){
            props.handleLogOut();
            props.history.push('/login');
            
        }

    }
    useEffect(()=>{
       fetchData();
    },[]);

    return(
        <div>
            <Navbar {...props}/>
            <div className="container">
                <div className='d-flex justify-content-center'>
                        <h1 className="text-center p-4">Projects</h1>
                        <DropdownButton id="dropdown-item-button-Info" className="d-flex align-items-center" title="Sort it based on">
                            <Dropdown.Item as="button">Action</Dropdown.Item>
                            <Dropdown.Item as="button">Another action</Dropdown.Item>
                            <Dropdown.Item as="button">Something else</Dropdown.Item>
                        </DropdownButton>
                </div>
                {!load 
                ? <div>Loading...</div> 
                :<ProjectList {...props} projects= {projects} reFetch={reFetch}/>}  

        </div>
       </div>
    );
}

export default Project;