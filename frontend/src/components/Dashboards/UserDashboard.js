import { useEffect, useState } from "react";

const Dashboard = () => {
    const [authenticated, setauthenticated] = useState(null);
    useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser== 'user') {
        setauthenticated(loggedInUser);
        console.log(authenticated)
    }
    }, []);

    if (authenticated=='false') {
  // Redirect
    } else {
    return (
    <div>
     <p>Welcome to user Dashboard</p>
    </div>
    );
    }
};

export default Dashboard;