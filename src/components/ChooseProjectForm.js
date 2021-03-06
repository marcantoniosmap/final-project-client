import React,{useState} from 'react'
import { Button, FormGroup, FormControl} from "react-bootstrap";


function ChooseProjectForm(props){
    const [title,setTitle]= useState("");
    const [description,setDescription]= useState("");

     async function handleSubmit (event){
        event.preventDefault();
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                     'auth-token': props.token},
          body: JSON.stringify({title: title, 
                                description :description, 
                                projectType:props.projectType})
        };
        try{
            const response = await fetch('https://project.cogether.me/api/project/create', requestOptions);
            const data = await response.json();
            if (response.status===200){
                props.history.push(`/`);
            }else{
                console.log("Failed to create");
            }
        }catch(err){
            props.hhistory.push('/');
        }
       
      }
    
    function validateForm() {
        return title.length > 0;;
      }

    return(                        
    <form onSubmit={handleSubmit}>
        <FormGroup controlId="title">
        Project Title
        <FormControl
            autoFocus
            type="text"
            default ="myProject"
            value={props.title}
            onChange={e => setTitle(e.target.value)}
        />
        </FormGroup>
        <FormGroup controlId="description" >
        Description of the project:
        <FormControl
            as="textarea"
            rows="3"
            value={props.description}
            onChange={e => setDescription(e.target.value)}
            type="text"
        />
        <div className="pt-2">
        <Button 
            block 
            disabled={!validateForm()} 
            type="submit"
            >
            Create Project Now
        </Button>
        </div>
        </FormGroup>
    </form>)
}


export default ChooseProjectForm