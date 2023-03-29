import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

export default function Auth(){
    const { signup, login } = useContext(UserContext);

    // set initial state for sign up form
    const initSignUpInputs = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        birthday: "",
        phoneNumber: "",
        password: "",
        favoriteSports: [],
        favoriteTeams: []
    };
    const [signUpInputs, setSignUpInputs] = useState(initSignUpInputs);

    // set initial state for login form
    const initLoginInputs = {
        username: "",
        password: ""
    };
    const [loginInputs, setLoginInputs] = useState(initLoginInputs);

    // create state for toggle between login and signup form
    const [authToggle, setAuthToggle] = useState(false);

    // handle change for signup
    function handleSignUpChange(event){
        const { name, value } = event.target;
        setSignUpInputs(prevSignUpInputs => ({
            ...prevSignUpInputs,
            [name]: value
        }))
    };

    // handle change for login
    function handleLoginChange(event){
        const { name, value } = event.target;
        setLoginInputs(prevLoginInputs => ({
            ...prevLoginInputs,
            [name]: value
        }))
    };

    // create function for signup
    function handleSignUp(event){
        event.preventDefault()
        signup(signUpInputs)
        setSignUpInputs(initSignUpInputs)
    };

    //create function for login
    function handleLogin(event){
        event.preventDefault()
        login(loginInputs)
        setLoginInputs(initLoginInputs)
    };

    // function to toggle between signup and login forms
    function handleAuthToggle(){
        setAuthToggle(prev => !prev)
    };

    return (
        <div className="auth--container">
            <h1>Greatest Sports Moments</h1>
            {authToggle ? 
            <>
                <SignUpForm 
                    handleChange={handleSignUpChange}
                    handleSubmit={handleSignUp}
                    inputs={signUpInputs}
                    toggle={handleAuthToggle}
                />
            </>
            :
            <>
                <LoginForm
                    handleChange={handleLoginChange}
                    handleSubmit={handleLogin}
                    inputs={loginInputs}
                    toggle={handleAuthToggle} 
                />
            </>
            }
        </div>
    )
}

