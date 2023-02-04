import React, { useState,useEffect } from "react";
import './ViewResponses.css'
const ViewResponses =()=>{
    const [forms,setForms]=useState([]);
    const [form,setForm]= useState({});
    const [selectedForm, setSelectedForm] = useState({});

    const[responses,setResponses] = useState([]);
    const [selectedResponse, setSelectedResponse] = useState({});

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
    console.log("hello")
    fetch('http://localhost:3000/getresponses?form_id='+selectedForm._id, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      if (response.status === 400) {
        return response.text()
      } else {
        return response.json()
      }
    })
    .then(data => {
      setResponses(data);
    });
    
    console.log("responses",responses)
  }
  }
  ,[selectedForm])


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

    console.log("responses",responses)
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
              {responses.length > 0 ? (
                responses.map((response)=> (
                  <div key={response._id}>
                  <hr style={{width: "80%", margin: "0%"}} />
                  <p className="pointer f3" onClick={() => (selectedResponse.name !== response.name)?setSelectedResponse(response):setSelectedResponse({})}>{response.name}</p>
                    {selectedResponse._id === response._id && (
                      <div className="selected-response">
                        {form.questions.map((question, index) => (
                          <div key={index}>
                            <p className="b f5">{index + 1}. {question.question}</p>
                            <p>
                              {response.responses[index] !== '-1' 
                                ? question.options[response.responses[index]] 
                                : "Not answered"}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No responses yet</p>
              )}
          </div>
          )}
      </div>
  )

}

export default ViewResponses;