import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'
import pic from '../images/collaborate.jpg'

function Collab(props){

    const [projectId,setProjectId]= useState(null);
    const [acceptedButton,setAcceptedButton]=useState(false);
    const [project,setProject ]= useState(null);
    const [ownProject,setOwnProject]= useState(false);

    async function checkCollab (){
        const project_id=props.match.params.id;
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                    'auth-token': props.token},
          body: JSON.stringify({ project_id: props.match.params.id, sharedPassword:props.match.params.password})
        };
        const response = await fetch('https://auth.cogether.me/api/userProject/collab', requestOptions);
        const data = await response.json();
        if (response.status===200){
            console.log(response.status);
            props.history.push(`/project/${project_id}`)
        }else{
            props.history.push('/');
        } 
      }
      async function fetchData(id,token){
        const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 
                    'auth-token': token},
        };
        const response = await fetch(`https://project.cogether.me/api/project/detail/${id}`, requestOptions);
        const data = await response.json();
        if (data.user._id===props.user){
            setOwnProject(true);
        }
        setProject(data);
        console.log(data);
    }
    useEffect(()=>{
        fetchData(props.match.params.id,props.token);
    },[])

    function CollabList(props){
        const list= props.list;

        const listCollab = list.map(collab=>
            props.user!==collab._id &&<li key={collab._id}>{collab.email}</li>
        );
        return(
            <ul>{listCollab}</ul>
        )
    }
  
    return(
        <div className="container-fluid height-max" style={{overflow:'hidden'}}>
        <div className="row h-100">
          <div className="col-lg-6 p-0 d-lg-block d-none">
            <img src={pic} className="w-100"/>
          </div> 
          <div className=" col-lg-6 d-flex justify-content-center align-items-center">
            <div className="Login px-5">
            {project ?
            <div>
               <h3 className="card-title">{!ownProject ? 'You have been invited to this project': 'You own this project'}</h3>
                     <p className="card-text"><b>Title</b>: {project.project.title}</p>
                     <p className="card-text"><b>description </b>: {project.project.description}</p>
                     <p className="card-text"><b>owner name</b>: {project.user.name}</p>
                     <p className="card-text"><b>{!ownProject && 'Other' } Collaborator</b> :</p>
                     <CollabList list={project.collaborator}/>
                     {!ownProject 
                    ?<button className='btn btn-primary'onClick={checkCollab}>Collaborate!</button>
                     : <Link to='/'>back to project page</Link>
                     }
            </div>

            : <div>loading</div>
            }
  
          </div>
        </div>
        </div>
      </div>

    )
}
export default Collab;