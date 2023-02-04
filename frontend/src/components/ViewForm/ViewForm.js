import React, { useState,useEffect } from "react";
import './ViewForm.css'

const ViewForm =()=>{
    const [forms,setForms] = useState([]);
    const [form,setForm]= useState({});
    const [selectedForm, setSelectedForm] = useState([]);

      useEffect(()=>{
        fetch('http://localhost:3000/getformnames', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          if (response.status === 400) {
            return response.text()
          } else {
            return response.json()
          }
        })
        .then(forms => {
          setForms(forms);
        });
      },[]);
      
    const handleClick = (clickedform) => {
        setSelectedForm(clickedform);
    }

    useEffect(()=>{
      if(Object.keys(selectedForm).length !==0){
      const idstring = selectedForm._id
      fetch('http://localhost:3000/getform/'+idstring, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.status === 400) {
          return response.text()
        } else {
          return response.json()
        }
      })
      .then(data => {
        setForm(data);
      });
    }

    },[selectedForm]);
    
    
    return(
        <div>
            {Object.keys(form).length === 0  && (
        <div>
          <p>All forms</p>
          <div className="tl">
            <ul>
              {forms.map((form)=> (
                <li key={form._id}>
                  <p className="pointer" onClick={() => handleClick(form)}>{form.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        )}
        {Object.keys(form).length !== 0 && (
            <div className="selected-form tl">
                <h2>{form.name}</h2>
                {form.questions.map((question, index) => (
                    <div key={index}>
                        <h3>{index+1}.{question.question}</h3>
                        <ul>
                            {question.options.map((option, i) => (
                                <li key={i}>{option}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            )}
        </div>
        
    )
}

export default ViewForm;