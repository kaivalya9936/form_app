import React, { useState,useEffect } from "react";
import './ViewResponses.css'
import Analytics from "./Analytics/Analytics";

const ViewResponses =()=>{
    const [forms,setForms]=useState([]);
    const [form,setForm]= useState({});
    const [selectedForm, setSelectedForm] = useState({});

    const[responses,setResponses] = useState([]);
    const [selectedResponse, setSelectedResponse] = useState({});

    const [analytics, setAnalytics] = useState(false);

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

    const handleAnalyticsClick= ()=>{
      setAnalytics(!analytics)

    }
    return(
      <div>
          {Object.keys(form).length === 0  && (
      <div>
        <h1>Select a form to view Responses</h1>
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
              <div className="flex">
              <>
              <h2>{form.name}</h2>
              </>
              <p className="f4 pointer grow" style={{border:'1px solid',padding:'4px 4px',alignSelf:'flex-end', margin:'0 auto 15px auto'}}
              onClick = {()=> handleAnalyticsClick()}> {analytics === false ? "Show Analytics" : "Hide Analytics"}</p>
              <button className="ma2 f5" style={{margin:'10px 10px 10px auto'}}onClick={() => {
                setForm({});
              } }>Back to forms</button>
              
              </div>
              {responses.length > 0 ? (
                analytics===false ?(
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
              ):
              (<Analytics form={form} responses = {responses}/>)
                
              ) : (
                <p>No responses yet</p>
              )}
          </div>
          )}
      </div>
  )

}

export default ViewResponses;