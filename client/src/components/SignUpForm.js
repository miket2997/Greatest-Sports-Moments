import React from "react";

export default function SignUpForm(props){
    const {
        handleChange,
        handleSubmit,
        inputs: {
            firstName,
            lastName,
            username,
            email,
            phoneNumber,
            birthday,
            password
        },
        toggle
    } = props;


    return (
        <form className="auth--form" onSubmit={handleSubmit}>
            <label>Enter your information below</label>
            <input
                type='text'
                name="firstName"
                onChange={handleChange}
                value={firstName}
                placeholder="First Name"
                required={true} 
            />
            <input 
                type='text'
                name="lastName"
                onChange={handleChange}
                value={lastName}
                placeholder="Last Name"
            />
            <input 
                type='text'
                name="username"
                onChange={handleChange}
                value={username}
                placeholder="Username"
                required={true}
            />
            <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                required={true}
            />
            <input
                type='password'
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                required={true}
            />
            <input
                type="number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number" 
            />
            <input
                type="date"
                name="birthday"
                value={birthday}
                onChange={handleChange}
                className="date--input"
            />
            <button className="submit--auth--btn">Sign up</button>
            <button className="toggle--auth--btn" onClick={() => toggle()} type="button">Already a member?</button>
        </form>
    )
}