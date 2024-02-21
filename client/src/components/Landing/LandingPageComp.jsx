import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import RegisterComp from "../Register/RegisterComp";
import LoginComp from "../Login/LoginComp";
import axios from "axios";
import { setEmail, setAccess, getCountries } from "../../redux/Actions";
import styles from "./landingPage.module.css";

const LandingPageComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeForm, setActiveForm] = useState(""); // Estado para controlar el formulario activo
 const [errormesa, setErromesa]= useState("");
 const [errormesa1, setErromesa1]= useState("");

 
  const handleSetActiveForm = (formName) => {
    setActiveForm(formName);
  };

  const register = async ({ email, password }) => {
    try {
      await axios.post("http://localhost:3001/users/register", {
        email,
        password,
      });
      dispatch(setEmail(email));
      dispatch(setAccess(true));
      dispatch(getCountries("", email));
      navigate("/home");
    } catch (error) {
      setErromesa1(error.response.data.error)
      
    }
  };

  const login = async ({ email, password }) => {
    try {
      await axios.get(
        `http://localhost:3001/users/login/?email=${email}&password=${password}`
      );
      dispatch(setEmail(email));
      dispatch(setAccess(true));
      dispatch(getCountries("", email));
      navigate("/home");
    } catch (error) {
      setErromesa(error.response.data.error);
     
      
    }
  };
console.log(errormesa);
  return (
    <div className={styles.landingContainer}>
      <h1>Welcome to the Countries</h1>
      <p>Please register or log in to access our services.</p>
      <div className={styles.formsContainer}>
        {/* Formulario de Registro */}
        {activeForm !== "register" && (
          <button onClick={() => handleSetActiveForm("register")}>Register</button>
        )}
        {activeForm === "register" && (
          <RegisterComp register={register} setActiveForm={setActiveForm} errormesa1={errormesa1} />
        )}

        {/* Formulario de Inicio de Sesión */}
        {activeForm !== "login" && (
          <button onClick={() => handleSetActiveForm("login")}>Login</button>
        )}
        {activeForm === "login" && (
          <LoginComp login={login} setActiveForm={setActiveForm} errormesa={errormesa} />
        )}
      </div>
    </div>
  );
};

export default LandingPageComp;
