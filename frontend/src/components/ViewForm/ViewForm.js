import React, { useState,useEffect,useMemo } from "react";
import './ViewForm.css';
import FormNames from "../FormTools/FormNames";
import FormDetails from '../FormTools/FormDetails';

const ViewForm =()=>{
    const [form,setForm]= useState({});
    const [selectedForm, setSelectedForm] = useState([]);
    

    const handleClick = (clickedform) => {
        setSelectedForm(clickedform);
    }


    const displayForm=()=>{
      return (<FormDetails selectedForm={selectedForm} handleSelectedForm={handleClick}/>)
    }

    useMemo(()=>{
      if(Object.keys(selectedForm).length !==0){
        displayForm();
    }
    },[selectedForm]);
    

    return(
        <div>
            {Object.keys(selectedForm).length === 0  && (
        <div>
          <h1>Select form to view details</h1>
          <div className="tl">
          <FormNames handleClick={handleClick}/>
          </div>
        </div>
        )}
        {Object.keys(selectedForm).length !== 0 && (
          <React.Fragment>
          {displayForm()}
          </React.Fragment>
        )}
        </div>
        
    )
}

export default ViewForm;