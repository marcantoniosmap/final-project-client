import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'

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
        const response = await fetch('CogetherAuth-env.eba-3vhu2w8q.ap-southeast-1.elasticbeanstalk.com/api/userProject/collab', requestOptions);
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
        const response = await fetch(`http://localhost:9000/api/project/detail/${id}`, requestOptions);
        const data = await response.json();
        if (data.user._id===props.user){
            setOwnProject(true);
        }
        setProject(data);
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
        <div>
            <Navbar {...props}/>
             {project ?
            <div className="container" style={{height:'100vh'}}>
                <div className=" h-100 d-flex justify-content-center align-items-center">
                    <div className="card p-3">
                        <div className='card-body'>
                            <h3 className="card-title">{!ownProject ? 'You have been invited to this project': 'You own this project'}</h3>
                            <p className="card-text"><b>Title</b>: {project.project.title}</p>
                            <p className="card-text"><b>description </b>: {project.project.description}</p>
                            <p className="card-text"><b>owner name</b>: {project.user.name}</p>
                            <p className="card-text"><b>Other collaborator</b> :</p>
                            {/* <ul>
                                {project.collaborator.map(collab=>
                                    <li key={collab._id}>{collab.email}</li>)}
                            </ul> */}
                            <CollabList list={project.collaborator}/>
                            {!ownProject?
                            <button className='btn btn-primary'onClick={checkCollab}>Collaborate!</button>
                            : <Link to='/'>back to project page</Link>
                            }
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
export default Collab;