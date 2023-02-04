import React, { useState, useMemo } from "react";
import CreateForm from '../CreateForm/CreateForm';
import ViewForm from '../ViewForm';
import ViewResponses from '../ViewResponses';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("createForm");

  const options = [
    { id: "createForm", label: "Create form" },
    { id: "viewForm", label: "View all forms" },
    { id: "viewResponses", label: "View responses" }
  ];

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
            <input
              type="radio"
              id={option.id}
              name="options"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => setSelectedOption(option.id)}
            />
            <label htmlFor={option.id} style={{ cursor: "pointer" }}>{option.label}</label>
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
