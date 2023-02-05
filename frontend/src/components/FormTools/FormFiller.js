import {React, useState, useEffect,useMemo} from 'react';
import { Form } from 'react-router-dom';

const FormFiller =({selectedForm, handleSelectedForm})=>{

    const [form, setForm] = useState({});

    const handleOptionChange = (index, optionIndex) => {
        setResponses((prevResponses) => {
          let newResponses = [...prevResponses];
          if (newResponses[index] === optionIndex) {
            newResponses[index] = -1;
          } else {
            newResponses[index] = optionIndex;
          }
          console.log(newResponses)
          return newResponses;
        }); 
      }
      const handleNameChange = (event) => {
        setUserName(event.target.value);
      };
    const [responses,setResponses] = useState([]);
    const [userName, setUserName] = useState('');
  
      const onSubmitResponses =(event) =>{
        const form_id = form._id;
        const name = userName;
        console.log(responses === new Array(responses.length).fill(-1))
        if(name===""){
            alert("Name field cannot be left empty!!")
        }
         else if(responses.length===0 || !responses.some(response => response !== -1)){
            alert("Please fill atleast one option!!!")
         }
         else{
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
              handleSelectedForm({});
            }
        });
    }
    }


    useMemo(()=>{
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
          console.log("setting curform")
          setForm(data);
        });
      }
      },[selectedForm]);

      return (
        <>
        {Object.keys(form).length ===0
          ? (<h3>Loading form data...</h3>)
          :(
            <><div className="selected-form tl">
            <div style={{display:'flex'}}>
            <h2>{form.name}</h2>
            <button className="ma2 f5" style={{margin:'10px 10px 10px auto'}}onClick={() => {
                handleSelectedForm({});
              } }>Back to forms</button>
              </div>
            <label className="b mb3 f5">
              Enter your name:
              <input
                type="text"
                value={userName}
                style={{padding:'0.25rem',margin:'0 10px 10px 10px'}}
                onChange={(event) => handleNameChange(event)} />
            </label>
            {form.questions.map((question, index) => (
              <div className="" key={index}>
              <hr style={{width: "80%", margin: "0% 10px"}} />
                <h3>{index + 1}. {question.question}</h3>
                <div className="tl">
                  {question.options.map((option, i) => (
                    <div className="flex optionsdiv" style={{margin:'10px 10px 10px 10px'}}key={i}>
                      <input
                        type="radio"
                        name={question.question}
                        value={option}
                        style={{width:'30px'}}
                        checked={responses[index] === i}
                        onChange={() => handleOptionChange(index, i)} 
                        onClick={() => {if(responses[index]===i){handleOptionChange(index, i)}}}
                        
                        />
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
              <button 
              className="ma2 f3" onClick={() => {
                onSubmitResponses();
              } }>Save </button>
            </div></>
          )
        }
        </>
        
      )
}

export default FormFiller;