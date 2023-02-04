import React, { useState, useEffect } from 'react';
import { Outlet, Routes, Route, Link } from 'react-router-dom'; 


function Admin() {
    const [showRegister, setShowRegister] = useState(false);
  
    return (
    <div>
        <Outlet/>
    </div>
    );
  }
  
export default Admin;