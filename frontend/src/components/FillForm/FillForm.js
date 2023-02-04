import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import './FillForm.css';

const FillForm =()=>{
  const navigate = useNavigate();
    const [forms,setForms] = useState([]);
    const [form,setForm]= useState({});
    const [selectedForm, setSelectedForm] = useState([]);
    const [responses,setResponses] = useState([]);
    const [userName, setUserName] = useState('');

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
    const handleOptionChange = (index, optionIndex) => {
      setResponses((prevResponses) => {
        let newResponses = [...prevResponses];
        newResponses[index] = optionIndex;
        return newResponses;
      });
    };
    const handleNameChange = (event) => {
      setUserName(event.target.value);
    };
  console.log(responses)
    const onSubmitResponses =(event) =>{
      const form_id = form._id;
      const name = userName;
      const response ={
        form_id,
        name,
        responses
      }
       fetch('http://localhost:3000/saveresponse',{
        method:'post',
        headers :{ 'Content-Type': 'application/json'},
        body: JSON.stringify({
          response
      })
       })
       .then(response => {
        if (response.status === 400) {
          return response.text()
        } else {
          return response.json()
        }
      })
      .then(data => {
        if(data === 'Success')
          {
            alert("Response saved successfully");
            navigate("/user/dashboard")
          }
      });
      
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
        setResponses(Array.from({length: data.questions.length}, (_, i) => -1))
      });
    }

    },[selectedForm]);
    
    
    return(
        <div>
            {Object.keys(form).length === 0  && (
        <div>
          <p>Select a form to fill</p>
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
            <><div className="selected-form tl">
            <h2>{form.name}</h2>
            <label className="b mv1 f5">
              Enter your name:
              <input
                type="text"
                value={userName}
                onChange={(event) => handleNameChange(event)} />
            </label>
            {form.questions.map((question, index) => (
              <div className="" key={index}>
                <h3>{index + 1}. {question.question}</h3>
                <div className="tl">
                  {question.options.map((option, i) => (
                    <div className="flex optionsdiv" key={i}>
                      <input
                        type="radio"
                        name={question.question}
                        value={option}
                        onChange={() => handleOptionChange(index, i)} />
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
              <button className="ma2 f3" onClick={() => {
                onSubmitResponses();
              } }>Save</button>
            </div></>
                          
            )}
        </div>

        
    )
}

export default FillForm;