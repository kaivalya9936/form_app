import React, { useState, useEffect } from 'react';
import { Outlet,Link, useNavigate } from 'react-router-dom'; 

function Register({typeUser}){
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [userName,setUserName] = useState('');
    const [errorMessage,setErrorMessage] = useState('');


    const onUserNameChange =(event)=>{
        setUserName(event.target.value)
    }

    const onEmailChange =(event)=>{
        setEmail(event.target.value)
    }

    const onPasswordChange =(event)=>{
        setPassword(event.target.value)
    }

    const onSubmitRegister =(event) =>{
        console.log("hi")
        fetch('http://localhost:3000/'+typeUser+'/register',{
            method :'post',
            headers :{'Content-Type':'application/json'},
            body: JSON.stringify({
                email: email,
                name: userName,
                password: password
            })
        })
        .then(response => {
            if (response.status === 400) {
                return response.text()
            } else {
                return response.json()
            }
        })
        .then(data=>{
            if(data === 'Success'){
                console.log("Registered!!")
                navigate('/'+typeUser+'/signin')
            }
            else{
                console.log(data)
                setErrorMessage(data)
            }
        })
    }
    
        return(
            (!typeUser)?
            <p> Loading...</p>
            :(
            <div >
                <main className="pa2 black-80">
                    <form className="center measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">{(typeUser=='user')?'User':'Admin'} Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="username">User Name</label>
                            <input
                             onChange={onUserNameChange}
                             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="username"  id="username"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                            <input
                             onChange={onEmailChange}
                             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                            <input 
                            onChange={onPasswordChange}
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                        onClick={()=>onSubmitRegister()}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f3 dib" 
                        id="RegisterButton"
                        type="button"
                        value="Register"/>
                        </div>
                        <p>Already have an acount?
                        <Link to={'/'+typeUser+'/signin'}
                        className="f4 link dim black db grow pointer">Sign In</Link></p>
                        {errorMessage ? <p className='b bg-red'style={{ color: 'white' }}>{errorMessage}</p> : null}
                    </form>
                </main>
                <Outlet/>
                </div>
            )
        );
    }

export default Register;