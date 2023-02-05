import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import './CreateForm.css';


const CreateForm = ({handleSelectedOption}) => {
  const navigate = useNavigate();
  const [formName,setFormName] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
    },
  ]);

  const handleQuestionChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };
  const handleNameChange =(event) =>{
    const name = event.target.value
    setFormName(name)
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
      },
    ]);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    setQuestions(newQuestions);
  };

  const deleteOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const deleteQuestion = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions.splice(questionIndex, 1);
    setQuestions(newQuestions);
  };

  const onSaveForm = (event) =>{
    
    const questionSet = questions.map((question)=> question)
    let flag = false
    let message=""
    
    if(questionSet.length===0){
      flag= true
      message = "Cannot have zero questions in a form!!"
    }
    questionSet.forEach((question)=>{
      if(question.question === "")
      {
        flag = true;
        message="Cannot have empty question field"
      }
      if(question.options.length === 0 && !flag){
        flag = true
        message ="Cannot have zero options for a question"
      }
      if(!flag){
      question.options.forEach((option)=>{
        if(option === ""){
          flag = true;
          message = "Option field cannot be empty!"
        }
      })
    }
    })

    if(formName ===""){
      flag = true;
      message = "Please provide a name for this form!!"
    }
    console.log(message)
    if(flag){
      alert(message)
    }
    else{
    const form = {
      name : formName,
      questions: questionSet
    }

    fetch('http://localhost:3000/createform',{
            method :'post',
            headers :{'Content-Type':'application/json'},
            body: JSON.stringify({
                form : form
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
          alert(data)
          if(data==='Success'){
          handleSelectedOption("")
          }
            
        })
      }
  }
  
  return (
    <div className="tl">
      <div className="mv2">
          <label className="b f3">
              Form Name : 
          <input
                type="text"
                value={formName}
                onChange={(event) => handleNameChange(event)}
              />
            </label>
            <hr style={{width: "80%", margin: "10px 10px 10px 10px"}} />
        </div>

      {questions.map((question, questionIndex) => (

        <div className="" key={questionIndex}>
          <label className="b mv1 f5">
            Question {questionIndex + 1} :
            <input
              type="text"
              value={question.question}
              onChange={(event) => handleQuestionChange(event, questionIndex)}
            />
            <button onClick={() => deleteQuestion(questionIndex)}>
                  Delete Question
                </button>
          </label>
          
          {question.options.map((option, optionIndex) => (
            <div className='f6 mv1'key={optionIndex}>
              <label>
                Option {optionIndex + 1} :
                <input
                  type="text"
                  value={option}
                  onChange={(event) =>
                    handleOptionChange(event, questionIndex, optionIndex)
                  }
                />
                <button className="fw5" onClick={() => deleteOption(questionIndex, optionIndex)}>
                  Delete Option
                </button>
              </label>
            </div>
          ))}
          <button className="mb3" onClick={() => addOption(questionIndex)}>Add Option</button>
          <hr style={{width: "80%", margin: "10px 10px 10px 10px", border:"0.5px dashed #e5525287"}} />
        </div>
      ))}
      <div className="flex mv2 items-left">
      <button className="mb4"onClick={addQuestion}>Add Question</button>
      </div>
      <button className="ma2 f3"onClick={()=>{
        onSaveForm();
        }}>Save</button>
    </div>
  );
};

export default CreateForm;
