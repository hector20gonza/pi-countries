import {
  GET_COUNTRIES,
  FILTER_COUNTRIES,
  ORDER_COUNTRIES,
  SET_ACCESS,
  SET_EMAIL,
  DELETE_ACTIVITY,
  UPDATE_ACTIVITY,
  FILTER_ACTIVITIES,
  GET_COUNTRINAME,
  GET_COUNTRY_ID,
  GET_ACT_USER,
} from "../redux/Types";

const initialState = {
  allCountries: [],
  filteredCountries: [],
  filteredActivities: [],
  countriesDetail: [],
  ActUser: [],
  email: [],
  access: false,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FILTER_ACTIVITIES:
  const { difficulty, season } = payload;
  // Si no hay filtros, mostrar todas las actividades del usuario
  if (!difficulty && !season) {
    return state;
  }

  // Filtrar actividades según los criterios proporcionados
  const filteredActivities = state.ActUser.filter((activity) => {
    // Filtrar por dificultad si se proporciona
    if (difficulty && activity.activity.difficulty !== parseInt(difficulty)) {
      return false;
    }
    // Filtrar por temporada si se proporciona
    if (season && activity.activity.season !== season) {
      return false;
    }
    return true;
  });

  return {
    ...state,
    ActUser: filteredActivities, // Actualizamos el estado con las actividades filtradas
  };


    case GET_ACT_USER:
      console.log(payload);
      return {
        ...state,
        ActUser: payload,
      };

    case DELETE_ACTIVITY:
      const { activityId, countryId } = payload;
      const updatedCountriesDetail = {
        ...state.countriesDetail,
        Activities: state.countriesDetail.Activities.filter(
          (activity) => activity.id !== activityId
        ),
      };

      return {
        ...state,
        countriesDetail: updatedCountriesDetail,
      };

    //--------------
    case UPDATE_ACTIVITY:
      const pacthCountries = state.allCountries.map((country) => {
        if (country.id === payload.countryId) {
          return {
            ...country,
            Activities: country.Activities.map((activity) => {
              if (activity.id === payload.activityId) {
                return payload.updatedActivity; // Assuming the payload includes the updated activity
              }
              return activity;
            }),
          };
        }
        return country;
      });
      return {
        ...state,
        allCountries: pacthCountries,
        filteredCountries: pacthCountries,
      };

    //----------------
    case SET_EMAIL:
      return { ...state, email: payload };

    case SET_ACCESS:
      return { ...state, access: payload };

    case GET_COUNTRY_ID:
      return {
        ...state,
        countriesDetail: payload,
      };
    case GET_COUNTRINAME:
      return {
        ...state,
        filteredCountries: payload,
      };

    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: payload,
        filteredCountries: payload,
      };

    case FILTER_COUNTRIES:
      const { continent } = payload;

      const countries = state.allCountries;
      const countriesFilteredByContinent =
        continent === "All"
          ? countries
          : countries.filter((country) => country.region === continent);
      return {
        ...state,
        filteredCountries: countriesFilteredByContinent,
      };

    case ORDER_COUNTRIES:
      console.log("Payload de ORDER_COUNTRIES:", payload);
      const { orderType, sortOrder } = payload; // Ajusta el nombre del campo aquí
      console.log("orderType:", orderType);
      console.log("sortOrder:", sortOrder); // Ajusta el nombre de la variable aquí
      const ascending = sortOrder === "asc"; // Calcula si es ascendente o no
      const sortedCountries = [...state.filteredCountries].sort((a, b) => {
        if (orderType === "name") {
          return (a.name < b.name ? -1 : 1) * (ascending ? 1 : -1);
        } else if (orderType === "population") {
          return (a.population - b.population) * (ascending ? 1 : -1);
        }
        return 0;
      });
      return { ...state, filteredCountries: sortedCountries };

    default:
      return state;
  }
};

export default rootReducer;
