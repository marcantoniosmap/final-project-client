import React, {useEffect, useState}from 'react';
import {
  FileExplorer,
  CodeMirror,
  BrowserPreview,
  SandpackProvider,
  SandpackConsumer
} from "react-smooshpack/es/components"
import "react-smooshpack/dist/styles.css"
import Navbar from './Navbar'
import CodeEditor from './CodeEditor';
import axios from 'axios';
import FileExplorerHeader from './FileExplorerHeader'
import {Resizable,ResizableBox} from 'react-resizable';
import $ from 'jquery'




function Editor(props) {

  const [files, setFiles] = useState({});
  const [projectEntry,setProjectEntry]=useState(null);
  const [projectId,setProjectId]= useState(null);
  const [widthFile,setFileWidth]=useState(180);

  function getFile(content){
    const dic={};
    for(let i =0; i<content.length;i++){
      try{
      dic[content[i].filename] = {code:content[i].code};
      }catch(err){
        dic[content[i].filename] = {code:''};

      }
      
    }
    setFiles(dic);    
  }

  function projectEntryList(projectType){
    if (projectType==="vanilla"){
      setProjectEntry("/index.js");
    }else{
      setProjectEntry("/src/index.js");
    }

  }

  function setWidth(){
    const width=$('#codeEditorBox').width()
    $('#browserView').width(1080-width);
  }

  function isEmpty(obj){
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }

  return true;
  }
  function refetch(openedPath){
    const temp=files;
    delete temp[openedPath];
    fetchData();
  }

  async function fetchData(){
    const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 
    'Accept': 'application/json',
                'auth-token': props.token}
    };
    try{
      // const response = await axios(`http://localhost:9001/getFromShareDB/${props.match.params.id}`, requestOptions);
      const response = await axios(`https://project.cogether.me/api/project/read/${props.match.params.id}`, requestOptions);
      projectEntryList(response.data.projectType);
      setProjectId(props.match.params.id);
      getFile(response.data.source);

    }catch(err){  
      if (err.status==401){
        props.history.push('/')
      }else if (err.status==403){
        props.handleLogOut('/');
        props.history.push('/login');
      }
    else{
      props.history.push('/');
    }
  }
}
  useEffect(()=>{
fetchData();
    
},[]);
      
  
  return (
    <div style={{ display: "block ", height: "100vh",width:"100vw", overflow:"hidden"}}>
      <Navbar {...props}/>
      {(isEmpty(files) || !projectEntry)
        ?<div>loading...</div>
      :<SandpackProvider
        files={files}
        dependencies={files["/package.json"].code}
        entry={projectEntry}
        showOpenInCodeSandbox={false}
        style={{
          width: "100%",
          height:"100%"
        }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            border: "1px solid black"
          }}
          >
              <ResizableBox 
                id='fileExplorer'
                width={180} 
                height={'100%'}
                axis={'x'}
                minConstraints={[180,0]}
                maxConstraints={[180,500]}
                resizeHandles={['e']}
                >
                <SandpackConsumer>
                  {sandpack=>{
                    return <FileExplorerHeader {...props} sandpack={sandpack} refetch={refetch} projectId={props.match.params.id}/>
                  }}
                </SandpackConsumer>
               
                  {/* <FileExplorer style={{ width: "180px", resize:"horizontal",width:"unset", minWidth:"180px", height:"100%"}}/> */}
                  <FileExplorer style={{height:"100%"}}/>
              </ResizableBox>
              <ResizableBox
                id='codeEditorBox' 
                width={800} 
                height={'100%'}
                axis={'x'}
                minConstraints={[400,0]}
                maxConstraints={[1000,500]}
                resizeHandles={['e']}
                onResizeStop={setWidth}

                >
                <SandpackConsumer>
                  {sandpack => {
                    return <CodeEditor project_id ={projectId} sandpack={sandpack} />
                  }}
                </SandpackConsumer>
            </ResizableBox>
            <ResizableBox 
                id='browserView' 
                width={700} 
                height={'100%'}
                axis={'x'}
                minConstraints={[400,0]}
                maxConstraints={[1000,0]}
                >
            <BrowserPreview style={{ width:'100%'}} />
            </ResizableBox>
          </div>
      </SandpackProvider>
      }
    </div>
  );
}

export default Editor;
