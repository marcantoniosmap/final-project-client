import React, { useState } from 'react'
import ChooseProjectForm from './ChooseProjectForm'


function ChooseProject(props){
    const [projectType,setProjectType]= useState("");
    
    function onClickVanilla(){
        setProjectType("vanilla");
    }
    function onClickReact(){
        setProjectType("react");
    }

    return(
        <div>
            <h3 className="text-center py-3">Choose Your Project type: </h3>
            <div className="row">
                <div className="col-lg-4">
                    <div className="card" onClick={onClickVanilla} style={{width:'100%', minHeight:'400px',overflow:'hidden'}}>
                        <img className="card-img-top" src='vanilla.png' alt="Card cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Vanilla JavaScript</h5>
                            <p className="card-text">Create your plain html css js now!</p>
                            {projectType==='vanilla' &&<ChooseProjectForm {...props} projectType={projectType}/>}

                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card" onClick={onClickReact} style={{width:'100%', minHeight:'400px',overflow:'hidden'}}>
                        <img className="card-img-top" src='react.png' alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">React Project</h5>
                            <p className="card-text">Create your react project ready with our boilerplate</p>
                            {projectType==='react' &&<ChooseProjectForm {...props} projectType={projectType}/>}

                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card" style={{width:'100%', height:'400px',overflow:'hidden'}}>
                        <img className="card-img-top" src='upload.png' alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Upload your Own</h5>
                            <p className="card-text">Click here to upload your current progress</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ChooseProject