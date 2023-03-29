import React from "react";


export default function LoginForm(props){
    const {
        handleChange,
        handleSubmit,
        inputs: {
            username,
            password
        },
        toggle
    } = props;

    return (
        <form className="auth--form" onSubmit={handleSubmit}>
            <label>Please enter your login info.</label>
            <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Username" 
            />
            <input 
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
            />
            <button className="submit--auth--btn">Login</button>
            <button className="toggle--auth--btn" type="button" onClick={() => toggle()}>Not a member?</button>
        </form>
    )
}