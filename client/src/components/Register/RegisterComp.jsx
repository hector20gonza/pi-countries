import React from 'react';
import styles from './Register.module.css';
import { useState } from 'react';
const RegisterComp = ({register}) => {
 
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
 
    register(userData);
   
  };
  return (
    <div className={styles.formContainer}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
       
        <label htmlFor="email">Email:</label>
        <input 
        type="email" 
        id="email" 
        name="email" 
        value={userData.email}
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterComp;