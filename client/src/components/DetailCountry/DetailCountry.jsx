import styles from "../DetailCountry/DetailsCountry.module.css";
import {deleteActivity,getCountryById} from "../../redux/actions"
import { useSelector ,useDispatch} from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
const DetailCountry = () => {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.countriesDetail);
    const email = useSelector((state)=>state.email);
  
     const { id } = useParams();
     console.log(email)
     console.log(country)
 const {
    name,
    image,
    region,
    capitalCity,
    subregion,
    area,
    population,
    Activities,
  } = country;
    useEffect(() => {
    dispatch(getCountryById(id,email));
   }, [dispatch, id]);


 
  // Aquí puedes utilizar countryById de manera segura, ya que se ha encontrado el país correspondiente al id.
console.log(Activities);
const handleDelete = (idactivity) => {
console.log(id, idactivity,email);
  dispatch(deleteActivity(id, idactivity,email));
};

    return (
        <div className={styles.globalContainer}>
        <div className={styles.detailContainer}>
          <div className={styles.imageContainer}>
            <p className={styles.id}>{id}</p>
            <img className={styles.flag} src={image} alt={name} />
            <p className={styles.name}>{name}</p>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.text}>
              <i className="fa-solid fa-earth-americas" />
              {`Continent: ${region}`}
            </p>
            <p className={styles.text}>
              <i className="fa-solid fa-map-pin" />
              {`Region: ${subregion}`}
            </p>
            <p className={styles.text}>
              <i className="fa-solid fa-city" />
              {`Capital City: ${capitalCity}`}
            </p>
            <p className={styles.text}>
              <i className="fa-solid fa-sign-hanging" />
              {`Area: ${area}m²`}
            </p>
            <p className={styles.text}>
              <i className="fa-solid fa-user-group" />
              {`Population: ${population} `}{" "}
            </p>
          </div>
        </div>

{/* Renderizar actividades */}
<div className={styles.activitiesContainer}>
        <h2>Activities</h2>
        {Activities && Activities.map((activity) => (
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