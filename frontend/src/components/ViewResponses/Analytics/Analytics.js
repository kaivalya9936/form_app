import React from 'react';
import PieChart from './PieChart';
import './Analytics.css'

const Analytics=({form,responses})=>{
    const questions = form.questions.map((question)=>question.question)
    const options = form.questions.map((question)=>["Not answered",...question.options])
    const responseCount = options.map((option)=>new Array(option.length).fill(0))
    responses.forEach(response => {
        response.responses.forEach((optionIndex, questionIndex) => {
          responseCount[questionIndex][Number(optionIndex)+1] += 1;
        });
      });

    const dataset = responseCount.map((counts, questionIndex) => {
        return counts.map((count, optionIndex) => {
          return {
            label: options[questionIndex][optionIndex],
            value: count
          };
        });
      });

    const gridOne = dataset.slice(0, Math.ceil(dataset.length / 2))
    const gridTwo = dataset.slice(Math.ceil(dataset.length / 2))

  return (
    <div>
      <h1>Analytics</h1>
      <div className='flex'>
      <div className='grid-container' style={{width:'50%'}} >
        {gridOne.map((data, index) => {
          return (
            <div className='grid-item' key={index} style={{ width: '60%' }}>
              <h3>{questions[index]}</h3>
              <PieChart chartData={gridOne[index]} text={questions[index]} />
            </div>
          );
        })}
      </div>
      <div className='grid-container' style={{width:'50%'}}>
        {gridTwo.map((data, index) => {
          return (
            <div className='grid-item' key={index} style={{ width: '60%' }}>
              <h3>{questions[index + Math.ceil(dataset.length / 2)]}</h3>
              <PieChart chartData={gridTwo[index]} text={questions[index + Math.ceil(dataset.length / 2)]} />
            </div>
          );
        })}
      </div>
      </div>
    </div>
  )
}

export default Analytics;