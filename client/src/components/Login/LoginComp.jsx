// LoginComp.js
import React, { useState } from "react";
import styles from "./Login.module.css";
import { validateLoginForm } from "../../validations/validateLogin"; // Importa la función de validación

const LoginComp = ({ login,errormesa }) => {
  
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
    // Limpiar los errores cuando se modifica el campo
    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el formulario
    const newErrors = validateLoginForm(userData);
    setErrors(newErrors);

    // Si no hay errores, realizar la función de inicio de sesión
    if (Object.keys(newErrors).length === 0) {
      login(userData);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Login</h2>
      {errormesa && <p className={styles.error}>{errormesa}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComp;
