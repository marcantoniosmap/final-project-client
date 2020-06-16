import React, { useState, useEffect} from 'react'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap'
import {Link} from 'react-router-dom'
import AreYouSure from './AreYouSure'
import UpdateProject from './UpdateProject'

function DetailView(props){
    
    const [detailData,setDetailData]= useState({});
    const [updateView,setUpdateView]= useState(false);
    const [collaborator,setCollaborator]= useState([]);
    const [user,setUser]= useState({});
    const [deleteBox,setDeleteBox]=useState(false);
    const [owner,setOwner]=useState(false);
    const [leaveBox,setLeaveBox]=useState(false);

    function showModal(){
        $('#modal').modal('show');
    }
    
    function closeModal(){
        $('#modal').modal('hide');
        props.handleClose();

    }
    function closeModalReload(){
        $('#modal').modal('hide');
        props.handleCloseReload();
    }
    function HandleDeleteBox(){
        setDeleteBox(true);
    }

    function HandleLeaveBox(){
        setLeaveBox(true);
    }

    function HandleEdit(){
        setUpdateView(true);
    }

    function handleLeave(answer){
        setLeaveBox(false);
        if (answer) leaveProject();
    }
    function handleDelete(answer){
        setDeleteBox(false);
        if (answer) deleteObject();
    }
    function parseDate(dateObj){
        return dateObj.getUTCDate();
    }
    async function deleteObject(){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 
                        'auth-token': props.token},
            };
            const response = await fetch(`http://CogetherProject-env.eba-hmw9hpih.ap-southeast-1.elasticbeanstalk.com/api/project/delete/${props.id}`, requestOptions);
            const data = await response.json();
            if (!data.status==='ok'){
                console.log('cannot delete projects');
            }
            closeModalReload();
    }
    async function leaveProject(){
        const requestOptions = {
            method: 'POSt',
            headers: { 'Content-Type': 'application/json', 
                        'auth-token': props.token},
            };
            const response = await fetch(`http://CogetherAuth-env.eba-3vhu2w8q.ap-southeast-1.elasticbeanstalk.com/api/userProject/leave/${props.id}`, requestOptions);
            const data = await response.json();
            if (!data.status==='ok'){
                console.log('cannot delete projects');
            }
            closeModalReload();
    }

    useEffect(()=>{
        async function fetchData(id,token){
            const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 
                        'auth-token': token},
            };
            const response = await fetch(`http://localhost:9000/api/project/detail/${id}`, requestOptions);
            const data = await response.json();
            if (props.user===data.user._id) setOwner(true);
            setDetailData(data.project);
            setCollaborator(data.collaborator);
            setUser(data.user);
            showModal();
        }fetchData(props.id,props.token);

    },[]);
    return(
        <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" aria-hidden="true" >
            <div className="modal-dialog modal-dialog-centered" role="document"> 
 
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Project Name: {detailData.title}</h5>
                        <button type="button" onClick={closeModal} className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {!updateView ?
                    <div> 
                    <div className="modal-body">
                      <p><b>Description</b>: {detailData.description}</p>
                      <p><b>Owner Name</b> : {user.name}</p>
                      <p><b>Collaborator</b>: </p>
                      <ul>
                     { collaborator.map((collab)=>(
                         props.user ===collab &&<li key={collab}>{collab.email}</li>
                        ))
                     }                
                     </ul>
                     <p className="text-break"><b>Sharable link </b> 
                     <button className='btn btn-sm btn-warning'onClick={() => 
                        {navigator.clipboard.writeText(`http://localhost:3000/collab/${detailData._id}/${detailData.sharedPassword}`)}}
                        >Copy sharable Link</button>
                     </p>

                      <p><b>Last updated at</b>: {detailData.last_updated_text}</p>          
                     <p><b>Created at </b>: {detailData.date_created_text}</p>
                       
                    </div>
                    <div className="modal-footer">
                        {
                            owner ?  <div><button type="button" onClick={HandleDeleteBox} className="btn btn-danger" >Delete</button>
                            <button type="button" onClick={HandleEdit} className="btn btn-secondary" >Edit</button></div>
                            : <button type="button" onClick={HandleLeaveBox} className="btn btn-secondary" >Leave</button>

                        }
                      
                        <button type="button" onClick={closeModal} className="btn btn-primary"><Link className="text-white"to={`/project/${detailData._id}`}>Code it now</Link></button>
                    </div>
                    </div>
                    :            
                    <UpdateProject closeModalReload={closeModalReload}data={detailData} collab={collaborator}token={props.token}/>
                    }
                    
                  
                 {deleteBox && <AreYouSure command ={'delete'}handleEvent={handleDelete}/>}
                 {leaveBox  && <AreYouSure command ={'leave'}handleEvent={handleLeave}/>}
                </div>
            </div>
        </div>
    )
}
export default DetailView