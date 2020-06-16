import React from 'react'
import Navbar from './Navbar'
import ChooseProject from './ChooseProject'


function Create(props){

    return(
        <div>
            <Navbar {...props}/>
            <div className="container height-max">
                <ChooseProject {...props} />
            </div>
        </div>
    )

}
export default Create