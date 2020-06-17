import React, { useEffect, useState } from 'react';
import ProjectList from './ProjectList'
import Navbar from './Navbar';
import ReactLoading from 'react-loading'

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
            const response = await fetch('https://auth.cogether.me/api/userProject', requestOptions);
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
                </div>
                {!load 
                ? <ReactLoading  color={'blue'} height={'20%'} width={'20%'} />
                :<ProjectList {...props} projects= {projects} reFetch={reFetch}/>}  

        </div>
       </div>
    );
}

export default Project;