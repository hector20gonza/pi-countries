import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RegisterComp from "../Register/RegisterComp";
import LoginComp from "../Login/LoginComp";
import axios from "axios";
import { setEmail, setAccess, setCountries } from "../../redux/actions";
//import Loading from "../Loading/Loading";
import styles from "./landingPage.module.css";
import useLocalStorage from "../../utils/useLocalStorage";

const LandingPageComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

 





  const register = async ({ email, password }) => {
    try {
      await axios.post("http://localhost:3001/users/register", {
        email,
        password,
      });
      dispatch(setEmail(email));
      dispatch(setAccess(true));
      dispatch(setCountries("", email));
      navigate("/home");
     
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const login = async ({ email, password }) => {
    try {
      await axios.get(
        `http://localhost:3001/users/login/?email=${email}&password=${password}`
      );
      dispatch(setEmail(email));
     
      dispatch(setAccess(true));
      dispatch(setCountries("", email));
      navigate("/home");
    
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  // Función para simular carga de datos o proceso
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.landingContainer}>
      <h1>Welcome to the Countries</h1>
      <p>Please register or log in to access our services.</p>
      <div className={styles.formsContainer}>
        <RegisterComp register={register}/>
        <LoginComp login={login}/>
      </div>
    
      
    </div>
  );
};

export default LandingPageComp;
