import React, { useState, useMemo } from "react";
import CreateForm from '../CreateForm/CreateForm';
import ViewForm from '../ViewForm/ViewForm';
import ViewResponses from '../ViewResponses/ViewResponses';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("createForm")
  const options = [
    { id: "createForm", label: "Create form" },
    { id: "viewForm", label: "View all forms" },
    { id: "viewResponses", label: "View responses" }
  ];
  const obj={}
  const currentComponent = useMemo(() => {
    switch (selectedOption) {
      case "createForm":
        return <CreateForm />;
      case "viewForm":
        return <ViewForm />;
      case "viewResponses":
        return <ViewResponses />;
      default:
        return null;
    }
    
  }, [selectedOption]);
  return (
    <div style={{ display: "flex" }}>
      <div className="ba" style={{
        width: "200px",
        height: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        {options.map(option => (
          <div key={option.id} style={{ marginBottom: "50px" }}>
            <p htmlFor={option.id} 
            style={{ cursor: "pointer",color: option.id === selectedOption ? "gray" : "initial"}} 
            onClick={() => {
                setSelectedOption(option.id)
              }}>
              {option.label}
              </p>
          </div>
        ))}
      </div>
      <div style={{ width: "100%", padding: "20px" }}>
        {currentComponent}
      </div>
    </div>
  );
};

export default Dashboard;
