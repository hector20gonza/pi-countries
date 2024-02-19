import { useNavigate } from "react-router-dom";
import styles from "../Country/Country.module.css";

const Country = ({ id, name, image, region, position }) => {
  const navigate = useNavigate();

  return (
    
    <div className={styles.countryContainer}>
      <img
        className={styles.flag}
        src={image}
        alt={name}
        onClick={() => navigate(`/detail/${id}`)}
      />
      <h2 className={position < 5 ? styles.continentUp : styles.continentDown}>{region}</h2>
      {/* <button className={styles.addActivity}>+</button> */}
      <div
        className={styles.textContainer}
        onClick={() => navigate(`/detail/${id}`)}
      >
        <p className={styles.country}>{name}</p>
      </div>
    </div>
   
  );
};

export default Country;