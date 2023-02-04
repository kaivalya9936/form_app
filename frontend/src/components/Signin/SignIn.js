import React, { useState, useEffect } from 'react';
import { Outlet,Link, useNavigate } from 'react-router-dom'; 

function SignIn({typeUser}){

    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const [authenticated, setAuthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || 'false')
        );

    const onEmailChange =(event)=>{
        setEmail(event.target.value)
    }

    const onPasswordChange =(event)=>{
        setPassword(event.target.value)
    }

    const onSubmitSignin =(event) =>{
        fetch('http://localhost:3000/'+typeUser+'/signin',{
            method :'post',
            headers :{'Content-Type':'application/json'},
            body: JSON.stringify({
                email: email,
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
        .then(data => {
            if (data.name) {
                localStorage.setItem("authenticated", typeUser);
                navigate('/'+typeUser+"/dashboard");
            } else {
                setErrorMessage(data);
            }
        })
    }
    console.log(authenticated)
        return(
            (!typeUser)?
            <p> Loading...</p>
            :(
            <div>
                <main className="pa2 black-80">
                    <form className="center measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">{(typeUser==='user')?'User':'Admin'} Sign In</legend>
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
                        <input className='mr1'
                        onClick={()=>onSubmitSignin()}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f3 dib" 
                        id="SignInButton"
                        type="button"
                        value="Sign in"/>
                        </div>
                        <p>Don't have an acount yet?
                        <Link to={'/'+typeUser+'/register'}
                        className="f4 link dim black db grow pointer">Register</Link></p>
                        
                        {errorMessage ? <p className='b bg-red'style={{ color: 'white' }}>{errorMessage}</p> : null}
                    </form>
                </main>
                <Outlet/>
            </div>)
        );
    }

export default SignIn;