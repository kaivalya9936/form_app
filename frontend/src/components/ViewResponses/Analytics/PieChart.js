import React from "react";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
import {Chart as ChartJS, Colors} from 'chart.js';

ChartJS.register(Colors);

function PieChart({ chartData,text }) {
  
  if (chartData.length === 0) {
    return <div>Loading Pie chart...</div>;
  }
  else{
    const labels = chartData.map(data=>data.label)

    const dataValues= chartData.map(data => data.value);
    const data = {
      labels : labels,
      datasets:[
      {
      label : '# of responses:',
      data : dataValues,
      borderColor: 'rgba(84, 168, 118, 0.7)',
      borderWidth : 2
    }
  ]
}
  return (
    <div>
      <Pie
        data={data}
        options={{
          hoverBackgroundColor: "rgba(84, 108, 118, 0.7)",
          hoverBorderColor:"black",
          hoverBorderWidth:1.5,
          plugins: {
            legend:{
              display:true,
              position:"right"
            },
            colors: {
                    enabled: true,
                    forceOverride :true
                  },
            title: {
              display: false,
            }
          }
        }}
      />
    </div>
  )};
}
export default PieChart;