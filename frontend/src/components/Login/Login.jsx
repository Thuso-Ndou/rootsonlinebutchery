//import React from 'react'
import { useContext, useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

export default function Login({setShowLogin}) {

    const {url,setToken} = useContext(StoreContext);

    const [currentState, setCurrentState] = useState("Login");
    const [data,setData] = useState({
        name:"",
        email: "",
        password: ""
    });

    const [helpText, setHelpText] = useState("");

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;

        if(currentState ==="Login"){
            newUrl += "/api/user/login";
        }
        else{
            newUrl += "/api/user/signup";
        }

        // call api
        const response = await axios.post(newUrl,data);

        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }
    };

    const handleHelpSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        let helpMsg = '';

        switch (keyword) {
            case "email":
                helpMsg = "Enter your valid email address.";
                break;
            case "password":
                helpMsg = "Use a strong password, with a mix of letters and numbers.";
                break;
            case "username":
                helpMsg = "This field appears when creating a new account. Enter your desired username.";
                break;
            default:
                helpMsg = "No help available for this keyword.";
        }

        setHelpText(helpMsg);
    };

  return (
    <div className='login'>
        <form onSubmit={onLogin} className="login-container">
            <div className="login-title">
                <h2>
                    {currentState}
                </h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cancel}  alt=''/>
            </div>
            <div className="login-input">
                {currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Username' title="Enter your username for sign-up" required />}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' title="Enter your email address" required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' title="Enter your password, a mix of letters and numbers is best" required />
            </div>
            <button type='submit'>{currentState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
            {currentState==="Login"?<p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>:<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>}

            {/* Help search and results */}
            <div className="help-section">
                <label htmlFor="helpSearch">Need help? Search for keywords:</label>
                <input type="text" id="helpSearch" placeholder="Enter keyword (e.g., email, password)" onKeyUp={handleHelpSearch} />
                <p className="help-result">{helpText}</p>
            </div>
        </form>
    </div>
  )
}