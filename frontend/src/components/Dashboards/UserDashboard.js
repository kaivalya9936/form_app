import { useEffect, useMemo,useState } from "react";
import ViewForm from '../ViewForm/ViewForm';
import FillForm from "../FillForm/FillForm";

const Dashboard = () => {
    const [selectedOption, setSelectedOption] = useState("fillForm")
    const options = [
      { id: "fillForm", label: "Fill a form " },
      { id: "viewForm", label: "View all forms" }
      
    ];
    const obj={}
    const currentComponent = useMemo(() => {
      switch (selectedOption) {
        case "viewForm":
          return <ViewForm />;
        case "fillForm":
          return <FillForm />;
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