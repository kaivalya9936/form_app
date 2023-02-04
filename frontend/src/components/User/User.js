import React, { useState, useEffect } from 'react';
import { Outlet, Routes, Route, Link } from 'react-router-dom'; 
import SignIn from '../Signin/SignIn';
import Register from '../Register/Register'

const User = ()=>{
  const [showRegister, setShowRegister] = useState(false);
  
  return (
  <div>
       <Outlet/>
  </div>
  );
}
export default User;