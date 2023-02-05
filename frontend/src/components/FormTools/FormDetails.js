import {React, useState, useEffect,useMemo} from 'react';

const FormDetails =({selectedForm, handleSelectedForm})=>{

    const [curForm, setCurForm] = useState({});


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
          setCurForm(data);
        });
      }
      },[selectedForm]);
      
      return (
        <>
        {Object.keys(curForm).length ===0
          ? (<h3>Loading form data...</h3>)
          :(
            <div className="selected-form tl">
                <div style={{display:'flex'}}>
                <h2>{curForm.name}</h2>
                <button className="ma2 f5" style={{margin:'10px 10px 10px auto'}}onClick={() => {
                handleSelectedForm({});
              } }>Back to forms</button>
                </div>
                {curForm.questions.map((question, index) => (
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
          )
        }
        </>
        
      )
}

export default FormDetails;