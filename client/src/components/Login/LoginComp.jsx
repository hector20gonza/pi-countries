import React from "react";
import styles from "./Login.module.css";
import { useState } from "react";
const LoginComp = ({login}) => {
  const [userData, setUserData] = useState({
    isRegister: false,
    email:'',
    password:''
   
    
  });
  const handleChange = (e) => {
    
    setUserData({
      ...userData,
      [e.target.name]:e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
 
   login(userData);
   
  };



  return (
    <div className={styles.formContainer}>
      <h2>Login</h2>
      <form   onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email" 
          id="email"
          value={userData.email}
          name="email" 
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
         type="password"
          id="password"
          name="password" 
          value={userData.password}
          onChange={handleChange}
          />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComp;
