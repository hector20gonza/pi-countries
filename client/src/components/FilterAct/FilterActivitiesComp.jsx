import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterActivities ,getactUser} from "../../redux/actions";
import styles from '../FilterAct/FilterActivitiesComp.module.css';

const FilterActivitiesComp = () => {
  const [difficulty, setDifficulty] = useState("");
  const [season, setSeason] = useState("");
  const dispatch = useDispatch();
  const userActivities= useSelector((state)=>state.ActUser);
const email= useSelector((state)=>state.email)
  const handleFilter = () => {
    dispatch(filterActivities(difficulty, season));
  };

  const handleResetFilter = () => {
    setDifficulty("");
    setSeason("");
    dispatch(getactUser(email)); // Pasa null para resetear los filtros
  };

  return (
    <div className="div">
      <div className={styles.filterContainer}>
        <h2>Filtrar Actividades</h2>
        <div className={styles.filterOptions}>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Dificultad</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
           <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select value={season} onChange={(e) => setSeason(e.target.value)}>
            <option value="">Temporada</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
          <button onClick={handleFilter}>Filtrar</button>
          <button onClick={handleResetFilter}>Mostrar Todas</button>
        </div>
      </div>
      <div>
        <div className={styles.activitiesContainer}>
          <div>
            <h2>Actividades del usuario:</h2>
            <ul>
              {userActivities.map((activity, index) => (
                <div key={index} className={styles.activitycard}>
                  <h3>{activity.activity.name}</h3>
                  <p>Dificultad: {activity.activity.difficulty}</p>
                  <p>Duración: {activity.activity.duration} horas</p>
                  <p>Temporada: {activity.activity.season}</p>
                  <p>Países:</p>
                  <ul>
                    {activity.countries.map((country, countryIndex) => (
                      <li key={countryIndex}>{country}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterActivitiesComp;
