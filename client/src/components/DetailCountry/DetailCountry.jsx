import styles from "../DetailCountry/DetailsCountry.module.css";
import {deleteActivity} from "../../redux/actions"
import { useSelector ,useDispatch} from "react-redux";
import { useParams } from 'react-router-dom';

const DetailCountry = () => {
  const dispatch = useDispatch();
    const filteredCountries = useSelector((state) => state.filteredCountries);
    const email = useSelector((state)=>state.email);
    const { id } = useParams();
const countryById = filteredCountries.find(country => country.id === id);


  console.log('País encontrado:', countryById);
  // Aquí puedes utilizar countryById de manera segura, ya que se ha encontrado el país correspondiente al id.
console.log(countryById.Activities);
const handleDelete = (idactivity) => {
console.log(countryById.id, idactivity,email);
  dispatch(deleteActivity(countryById.id, idactivity,email));
};

    return (
        <div className={styles.globalContainer}>
        <div className={styles.detailContainer}>
          <div className={styles.imageContainer}>
            <p className={styles.id}>{countryById.id}</p>
            <img className={styles.flag} src={countryById.image} alt={countryById.name} />
            <p className={styles.name}>{countryById.name}</p>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.text}>
              <i className="fa-solid fa-earth-americas" />
              {`Continent: ${countryById.region}`}
            </p>
            <p className={styles.text}>
              <i className="fa-solid fa-map-pin" />
              {`Region: ${countryById.subregion}`}
            </p>
            <p className={styles.text}>
              <i className="fa-solid fa-city" />
              {`Capital City: ${countryById.capitalCity}`}
            </p>
            <p className={styles.text}>
              <i className="fa-solid fa-sign-hanging" />
              {`Area: ${countryById.area}m²`}
            </p>
            <p className={styles.text}>
              <i className="fa-solid fa-user-group" />
              {`Population: ${countryById.population} `}{" "}
            </p>
          </div>
        </div>

{/* Renderizar actividades */}
<div className={styles.activitiesContainer}>
        <h2>Activities</h2>
        {countryById.Activities.map((activity) => (
          <div key={activity.id} className={styles.activityCard}>
          
            <h3>{activity.name}</h3>
            <p>Difficulty: {activity.difficulty}</p>
            <p>Duration: {activity.duration}</p>
            <p>Season: {activity.season}</p>
            <div className={styles.actions}>
          <button className={styles.actionButton}  onClick={() => handleDelete(activity.id)}>
          <i className="fas fa-trash-alt"></i> Delete
         </button>
      </div>
          </div>
        ))}
       </div>

      </div>
    );
  };
  
  export default DetailCountry;