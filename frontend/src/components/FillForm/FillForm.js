import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import './FillForm.css';
import FormNames from "../FormTools/FormNames";
import FormFiller from '../FormTools/FormFiller';

const FillForm =()=>{
  const navigate = useNavigate();
    const [form,setForm]= useState({});
    const [selectedForm, setSelectedForm] = useState([]);
    
      
    const handleClick = (clickedform) => {
        setSelectedForm(clickedform);
    }
      
    console.log("selectedForm",selectedForm)
    
    return(
        <div>
            {Object.keys(selectedForm).length === 0  && (
        <div>
          <h1>Select a form to fill</h1>
          <div className="tl">
          <FormNames handleClick={handleClick}/>
          </div>
        </div>
        )}
        {Object.keys(selectedForm).length !== 0 && (
            <FormFiller handleSelectedForm={handleClick} selectedForm={selectedForm}/>
                          
            )}
        </div>

        
    )
}

export default FillForm;