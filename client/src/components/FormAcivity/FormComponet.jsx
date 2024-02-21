import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getCountries } from "../../redux/actions";
import styles from "../../components/FormAcivity/Formcomponent.module.css";
import { validateForm } from "../../validations/validateLogin"; // Importa la función de validación

const FormComponent = () => {
  const email = useSelector((state) => state.email);
  const countries = useSelector((state) => state.allCountries);
  const dispatch = useDispatch();

  const [activityData, setActivityData] = useState({
    name: "",
    difficulty: 1,
    duration: "",
    season: "Verano",
    countries: [],
  });

  const [errors, setErrors] = useState({}); // Estado para almacenar errores de validación

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const handleCountryChange = (event) => {
    const selectedCountry = countries.find(country => country.id === event.target.value);
    if (selectedCountry) {
      setActivityData({ ...activityData, countries: [...activityData.countries, selectedCountry] });
    }
  };

  const removeCountry = (id) => {
    setActivityData({
      ...activityData,
      countries: activityData.countries.filter(country => country.id !== id)
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(activityData); // Validar el formulario
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Actualizar el estado de errores si hay errores
      return; // Detener el envío del formulario si hay errores
    }

    try {
      if (!email) {
        throw new Error("You need an account to create activities!");
      }

      const countryIds = activityData.countries.map(country => country.id).join(",");
      const response = await axios.post(`http://localhost:3001/activities?id=${countryIds}&email=${email}`, {
        ...activityData,
      });

      alert("Activity created successfully");
      setActivityData({
        name: "",
        difficulty: 1,
        duration: "",
        season: "Verano",
        countries: [],
      });
      dispatch(getCountries("", email));
    } catch (error) {
      alert(error.response?.data?.error || error.message);
      console.error(error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.activity}>
        <h2 className={styles.title}>Create Activity</h2>
        
        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.label}>
            Activity Name
          </label>
          <div className={styles.inputField}>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Write the name of the Activity"
              value={activityData.name}
              onChange={handleChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="difficulty" className={styles.label}>
            Difficulty
          </label>
          <div className={styles.inputField}>
            <input
              className={styles.input}
              type="number"
              name="difficulty"
              min="1"
              max="5"
              value={activityData.difficulty}
              onChange={handleChange}
            />
            {errors.difficulty && <p className={styles.error}>{errors.difficulty}</p>}
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="duration" className={styles.label}>
            Duration
          </label>
          <div className={styles.inputField}>
            <input
              className={styles.input}
              type="text"
              name="duration"
              placeholder="Enter duration (e.g., 1:30)"
              value={activityData.duration}
              onChange={handleChange}
            />
            {errors.duration && <p className={styles.error}>{errors.duration}</p>}
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="season" className={styles.label}>
            Season
          </label>
          <select
            className={styles.select}
            name="season"
            value={activityData.season}
            onChange={handleChange}
          > 
            <option value="Verano">Verano</option>
            <option value="Invierno">Invierno</option>
            <option value="Otoño">Otoño</option>
            <option value="Primavera">Primavera</option>
          </select>
          {errors.season && <p className={styles.error}>{errors.season}</p>}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="country" className={styles.label}>
            Countries
          </label>
          <div className={styles.selectedCountries}>
            {activityData.countries.map(country => (
              <div key={country.id} className={styles.selectedCountry}>
                <img src={country.image} alt={country.name} className={styles.countryFlag} />
                <span>{country.name}</span>
                <button type="button" className={styles.removeButton} onClick={() => removeCountry(country.id)}>X</button>
              </div>
            ))}
          </div>
          <select
            className={styles.select}
            name="country"
            value=""
            onChange={handleCountryChange}
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.countries && <p className={styles.error}>{errors.countries}</p>}
        </div>

        <button type="submit" className={styles.submit}>
          CREATE ACTIVITY
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
