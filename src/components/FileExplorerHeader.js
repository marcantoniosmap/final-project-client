import React, { useState } from 'react'
// import { Button, FormGroup, FormControl} from "react-bootstrap";
// import axios from'axios'

function FileExplorerHeader(props){

    const { files, openedPath } = props.sandpack;

    const [open,setOpen]= useState(false);
    const [input,setInput]= useState("");
    const [fileType,setFileType]= useState("");

    function handleClick(fileType){
        setFileType(fileType);
        open ? setOpen(false) : setOpen(true);
    }
    async function handleDelete (event){
        event.preventDefault();
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                      'Accept': 'application/json',
                     'auth-token': props.token},
          body: JSON.stringify({
                _id: props.projectId,
                fileName:openedPath })
        };
        try{
            const response = await fetch(`CogetherAuth-env.eba-3vhu2w8q.ap-southeast-1.elasticbeanstalk.com/api/project/deleteObject`, requestOptions)
            // delete files[openedPath];
            // props.sandpack.openedPath='/index.js';
            props.refetch(openedPath);
            }catch(err){
              if (err.response.status==401){
              alert("error")
              }else if (err.response.status==403) props.history.push('/login');
            else{
              alert("error",err)
            }
          }
      }

    async function handleSubmit (event){
        event.preventDefault();
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                     'auth-token': props.token},
          body: JSON.stringify({
                _id: props.projectId,
                fileType: fileType,
                fileName:input })
        };
        try{
            const response = await fetch(`http://CogetherProject-env.eba-hmw9hpih.ap-southeast-1.elasticbeanstalk.com/api/project/createObject`, requestOptions)
            setOpen(false);
            setInput("");
            setFileType("");
            props.refetch();
            }catch(err){
              if (err.response.status==401){
              alert("error")
              }else if (err.response.status==403) props.history.push('/login');
            else{
              alert("error",err)
            }
          }
      }
    return(
        <div>
        <div className="sandpack-FileExplorer__container row">
            <div className="col-6">
                <div className="sandpack-File__container"><b>File</b></div>
            </div>
            <div className="col-6 file_icons d-flex align-items-center">
                <i onClick={(e)=>handleClick("file")}className="fa fa-file-o px-1 pb-1">
                    <span className="tooltip">Tooltip text</span>
                </i>
                <i onClick={(e)=>handleClick("folder")}className="fa fa-folder-o px-1" style={{fontSize:'18px'}}></i>
                <i onClick={handleDelete}className="fa fa-trash-o px-1 pb-1"style={{fontSize:'18px'}}></i>
            </div>
            </div>

            {open && 
            <div className="sandpack-FileExplorer__container pl-35">
                <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    className="blending_input sandpack-File__container p-0" 
                    placeholder={`insert ${fileType} name`}
                    value={input}
                    onChange={e=>setInput(e.target.value)} 
                    />
             
                </form>
            </div>
         }
        </div>

    )
}

export default FileExplorerHeader;