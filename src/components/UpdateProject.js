import React, {useState} from 'react'
import {FormGroup, FormControl} from "react-bootstrap";
import $ from 'jquery'

function UpdateProject({data,token,closeModalReload,collab}){
    const [useToken,setUseToken]=useState(token);
    const [dataId,setDataId]= useState(data._id);
    const [title,setTitle]=useState(data.title);
    const [description,setDescription]=useState(data.description);
    const [deletedCollaborator,setDeletedCollaborator]=useState([]);


    async function handleSubmit(event){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
                        'Accept': 'application/json', 
                        'auth-token': useToken},
            body: JSON.stringify({ _id: dataId, title:title,description:description,deletedCollab:deletedCollaborator})
            };
            const response = await fetch(`https://project.cogether.me/api/project/updateProject`, requestOptions);
            const data = await response.json();
            if (data.status==='OK'){
                closeModalReload();
            }
    }
    function deleteCollab(id){

        if ($('#'+id).hasClass('strike')){
            var index = deletedCollaborator.indexOf(id);
            if (index !== -1) deletedCollaborator.splice(index, 1);
        }else{
            deletedCollaborator.push(id)
        }
        $('#'+id).toggleClass('strike');
    }

    return(
        <div>
        <form onSubmit={handleSubmit}>
        <div className="modal-body"> 

            <FormGroup controlId="title">
            Project Title
            <FormControl
                autoFocus
                type="text"
                default ="myProject"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            </FormGroup>
            <FormGroup controlId="description" >
                Description of the project:
            <FormControl
                as="textarea"
                rows="3"
                value={description}
                onChange={e => setDescription(e.target.value)}
                type="text"
            />
            </FormGroup>
            <p>Delete Collaborator</p>
            
                {collab.map((collabrated)=>(
                    <div>
                        <i onClick={e=>deleteCollab(collabrated._id)}className="fa fa-times" style={{color:'red'}}></i><span id={collabrated._id} key ={collabrated._id} >{collabrated.email}</span>
                    </div>
                ))}
            
         
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" >Cancel</button>
            <FormGroup>
                <button type="submit"className="btn btn-primary">Change</button>
            </FormGroup>
        </div>
        </form>
        </div>
    )

}

export default UpdateProject