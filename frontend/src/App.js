import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import SignIn from './components/Signin/SignIn';
import Register from './components/Register/Register'
import User from './components/User/User';
import AdminDashboard from './components/Dashboards/AdminDashboard';
import UserDashboard from './components/Dashboards/UserDashboard';



function App() {
  return (
    <div className="App bg-light-blue">
     <Router>
        <div className='mw10 center bg-light-blue pa2 ph4-ns br3 shadow-3 mb3'>
          <div className='flex items-center'>
            <Link className='pv1-ns f3 fw6 dim black-70 mr2 mr3-m mr4-1 dib link'  to="/admin">Admin</Link>
            <Link className='pv1-ns f3 fw6 dim black-70 mr2 mr3-m mr4-1 dib link ' to="/user/" >User</Link>
          </div>
        </div>
        <Routes>
        <Route index element={<Admin/>}/>
        <Route path="admin" element={<Admin/>} >
          <Route index element={<SignIn typeUser='admin'/>}/>
          <Route path='signin' element={<SignIn typeUser='admin'/>}/>
          <Route path='register' element={<Register typeUser='admin'/>}/>
        </Route>
        <Route path="/user/" element={<User/>} >
          <Route index className='center' element={<SignIn typeUser='user'/>}/>
          <Route path='signin' element={<SignIn typeUser='user'/>}/>
          <Route path='register' element={<Register typeUser='user'/>}/>
        </Route>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/user/dashboard' element={<UserDashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
