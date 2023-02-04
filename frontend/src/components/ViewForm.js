import React, { useState } from "react";
import './ViewForm.css'

const ViewForm =()=>{
    console.log("called")
    const [forms,setForms]=useState([]);
    const [selectedForm, setSelectedForm] = useState({});

      fetch('http://localhost:3000/getforms', {
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
          setForms(data);
          console.log(data);
        });

    const handleClick = (form) => {
        setSelectedForm(form);
    };

    return(
        <div>
            {Object.keys(selectedForm).length === 0 && (
        <div>
          <p>All forms</p>
          <div className="tl">
            <ul>
              {forms.map(form => (
                <li key={form._id}>
                  <p className="pointer" onClick={() => handleClick(form)}>{form.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        )}
        {Object.keys(selectedForm).length !== 0 && (
            <div className="selected-form tl">
                <h2>{selectedForm.name}</h2>
                {selectedForm.questions.map((question, index) => (
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