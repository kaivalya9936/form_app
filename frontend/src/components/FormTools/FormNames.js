import { React, useState, useEffect } from 'react';

const FormNames =({handleClick}) =>{
    const [forms,setForms] = useState([]);

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

    return(
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
    )
}

export default FormNames;