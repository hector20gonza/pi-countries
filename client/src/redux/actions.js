import {
  GET_COUNTRIES,
  FILTER_COUNTRIES,
  ORDER_COUNTRIES,
  SET_ACCESS,
  SET_EMAIL,
  DELETE_ACTIVITY,
  UPDATE_ACTIVITY,
  GET_COUNTRY_ID,
  GET_COUNTRINAME,
  GET_ACT_USER,
  FILTER_ACTIVITIES
} from "./Types";
import axios from "axios";
export const filterActivities = (difficulty, season) => {
  return {
    type: FILTER_ACTIVITIES,
    payload: { difficulty, season },
  };
};
export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const setAccess = (access) => ({
  type: SET_ACCESS,
  payload: access,
});
export const getCountryById = (id,email) => async(dispatch)=>{
  try {
    console.log(email);
    const {data} = await axios.get(`http://localhost:3001/countries/${id}?email=${email}`);
    dispatch({ 
      type: GET_COUNTRY_ID, 
      payload: data });

  } catch (error) {
    alert(error.response.data.error);
  }
    
      
};
export const getCountryName= (searchInput, email) => async (dispatch) => {
  try {
    // Reset filtered countries before making the API request
   

    const { data } = await axios.get(
      `http://localhost:3001/countries?name=${searchInput}&email=${email}`
    );

    // Update countries data
    dispatch({
      type: GET_COUNTRINAME,
      payload: data,
    });
   
  } catch (error) {
    alert(error.response.data.error);
  }
};

export const getCountries = (searchInput, email) => async (dispatch) => {
  try {
    // Reset filtered countries before making the API request
   

    const { data } = await axios.get(
      `http://localhost:3001/countries?name=${searchInput}&email=${email}`
    );

    // Update countries data
    dispatch({
      type: GET_COUNTRIES,
      payload: data,
    });
   
  } catch (error) {
    alert(error.response.data.error);
  }
};
export const deleteActivity = (countryId, activityId, email) => async (dispatch) => {
    try {
      // Realizar la solicitud para eliminar la actividadS
      console.log(activityId);
      //  await axios.delete(`http://localhost:3001/activities/?countryId=${countryId}?activityId=${activityId}&email=${email}`);
      await axios.delete(
        `http://localhost:3001/activities/${activityId}/${countryId}?email=${email}`
      );
      // Despachar la acción para actualizar el estado
      dispatch({
        type: DELETE_ACTIVITY,
        payload: { activityId, countryId, email },
      });
    } catch (error) {
      console.error("Error al eliminar la actividad:", error);
    }
  };
//-------------------
export const updateActivity = (countryId, activityId, email) => async (dispatch) => {
    try {
      // Realizar la solicitud para eliminar la actividadS
      console.log(activityId);
      //  await axios.delete(`http://localhost:3001/activities/?countryId=${countryId}?activityId=${activityId}&email=${email}`);
      await axios.patch(
        `http://localhost:3001/activities/${activityId}/${countryId}?email=${email}`
      );
      // Despachar la acción para actualizar el estado
      dispatch({
        type: UPDATE_ACTIVITY,
        payload: { activityId, countryId, email },
      });
    } catch (error) {
      console.error("Error al eliminar la actividad:", error);
    }
  };
  
  export const filterCountries = (continent) => ({
    type: FILTER_COUNTRIES,
    payload: { continent },
  });

export const orderCountries = (order) => ({
  type: ORDER_COUNTRIES,
  payload: order,
});

export const getactUser =(email) =>async(dispatch)=>{
try{
const {data} = await axios.get(`http://localhost:3001/activities/ActiUser/?email=${email}`);
  dispatch({ 
    type:  GET_ACT_USER, 
    payload: data});
}catch(error){
  alert(error.response.data.error);
}
}