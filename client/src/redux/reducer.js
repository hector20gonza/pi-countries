import {
  SET_COUNTRIES,
  FILTER_COUNTRIES,
  ORDER_COUNTRIES,
  SET_ACCESS,
  SET_EMAIL,
  DELETE_ACTIVITY,
  UPDATE_ACTIVITY,
  RESET_FILTERED_COUNTRIES,
} from "../redux/Types";

const initialState = {
  allCountries: [],
  filteredCountries: [],

  access: false,
};

const filterByContinent = (countries, filterInfo) => {
  if (!filterInfo) return countries;
  return countries.filter((country) => country.region === filterInfo);
};

const filterByActivity = (countries, filterInfo) => {
  const { difficulty, season } = filterInfo;
  if (!difficulty && !season) return countries;
  return countries.filter((country) =>
    country.Activities?.some(
      (activity) =>
        (!difficulty || difficulty === activity.difficulty) &&
        (!season || season === activity.season)
    )
  );
};

const filterFunctions = {
  continent: filterByContinent,
  activity: filterByActivity,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DELETE_ACTIVITY:
      // Filtra las actividades del país para eliminar la actividad eliminada
      const updatedCountries = state.allCountries.map((country) => {
        if (country.id === payload.countryId) {
          return {
            ...country,
            Activities: country.Activities.filter(
              (activity) => activity.id !== payload.activityId
            ),
          };
        }
        return country;
      });
      return {
        ...state,
        allCountries: updatedCountries,
        filteredCountries: updatedCountries,
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
    case RESET_FILTERED_COUNTRIES:
      return {
        ...state,
        filteredCountries: state.allCountries,
      };
    case SET_COUNTRIES:
      return { ...state, allCountries:payload,  filteredCountries: payload};
     
    case FILTER_COUNTRIES:
      console.log("FILTER_COUNTRIES payload:", payload);
      const { filterType, filterInfo } = payload;
      const filterFunction =
        filterFunctions[filterType] || ((countries) => countries);
       
      return {
        ...state,
        filteredCountries: filterFunction(state.allCountries, filterInfo),
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
