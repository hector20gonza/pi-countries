// RegisterComp.js
import React, { useState } from 'react';
import styles from './Register.module.css';
import { validateRegisterForm } from '../../validations/validateLogin'; // Importa la función de validación

const RegisterComp = ({ register,errormesa1 }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
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
      [e.target.name]: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el formulario
    const newErrors = validateRegisterForm(userData);
    setErrors(newErrors);

    // Si no hay errores, realizar la función de registro
    if (Object.keys(newErrors).length === 0) {
      register(userData);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Register</h2>
      {errormesa1 && <p className={styles.error}>{errormesa1}</p>}
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterComp;
