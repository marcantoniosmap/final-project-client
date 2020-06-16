import React, { useState } from "react";
import {Link} from 'react-router-dom';
import DetailView from './DetailView'


function ProjectList(props){

    const [load,setLoad]=useState("");

    function handleClick(id){
        setLoad(id);
    }

    function handleClose(){
        setLoad("");
    }
    function handleCloseReload(){
        setLoad("");
        props.reFetch();
    }
    return(
        <div className="row">
    {props.projects.map((project)=>(
        <div key ={project._id} className="col-lg-3 py-2">
            <div className="card" style={{width:'100%', height:'380px',overflow:'hidden'}}>
                <img className="card-img-top" src={`${project.projectType}.png`} alt="Card cap"/>
                <div className="card-body">
                    <h5 className="card-title text-truncate" style={{maxHeight:"160px"}}>{project.title}</h5>
                    <p className="card-text text-truncate" style={{maxHeight:"150px"}}>{project.description}</p>
                    <p className="card-text"><small className="text-muted">Last Updated {project.last_updated_text}</small></p>
                    <button type="button" className="btn btn-primary "onClick={e=>handleClick(project._id)}> Details</button>
                </div>
            </div>
        </div>
    ))}
    <div className="col-lg-3 py-2">
            <div className="card" style={{width:'100%', height:'380px',overflow:'hidden'}}>
                <div className="card-body d-flex align-items-center  justify-content-center text-center">
                    <h5 className="card-title"><Link to={'/create'}>Create New Projects</Link></h5>
                </div>
            </div>
        </div>
        
        {load.length>0 &&<DetailView {...props} id={load} handleClose={handleClose} handleCloseReload={handleCloseReload}/>}
    </div>

    )
}

export default ProjectList;