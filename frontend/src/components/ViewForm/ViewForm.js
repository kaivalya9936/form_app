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
          <h1>Select form to view details</h1>
          <div className="tl">
            <ul>
              {forms.map((form)=> (
                <>
                <hr style={{width: "80%", margin: "0%"}} />
                <li key={form._id}>
                  <p className="pointer" onClick={() => handleClick(form)}>{form.name}</p>
                </li>
                </>
              ))}
            </ul>
          </div>
        </div>
        )}
        {Object.keys(form).length !== 0 && (
            <div className="selected-form tl">
                <div style={{display:'flex'}}>
                <h2>{form.name}</h2>
                <button className="ma2 f5" style={{margin:'10px 10px 10px auto'}}onClick={() => {
                setForm({});
              } }>Back to forms</button>
                </div>
                {form.questions.map((question, index) => (
                    <div key={index}>
                    <hr style={{width: "80%", margin: "0px"}} />
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