import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector} from 'react-redux';
import { filterCountries, orderCountries,setAccess,getactUser,filterActivities} from '../../redux/actions';
import styles from '../Nav/Nav.module.css';
import SearchBar from '../SearchBar/SearchBar';

const Nav = () => {
  const email = useSelector((state)=>state.email)
  const [filtroActividadesAbierto, setFiltroActividadesAbierto] = useState(false);
  const [filtroOrdenAbierto, setFiltroOrdenAbierto] = useState(false);
  const [filtroCiudadesAbierto, setFiltroCiudadesAbierto] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submenuAbierto, setSubmenuAbierto] = useState(false);

  const toggleSubmenu = () => {
    setSubmenuAbierto(!submenuAbierto);
  };
  const toggleFiltroActividades = () => {
    setFiltroActividadesAbierto(!filtroActividadesAbierto);
  };

  const toggleFiltroOrden = () => {
    setFiltroOrdenAbierto(!filtroOrdenAbierto);
  };

  const toggleFiltroCiudades = () => {
    setFiltroCiudadesAbierto(!filtroCiudadesAbierto);
  };
  
  const handlerActivity = () => {
    navigate("/activity");
  };

  const handleContinentFilter = (continent) => {
    if (location.pathname.includes('/detail')) {
      navigate("/home");
    }
    if(continent=== null){
      dispatch(resetFilteredCountries())
    }
    else{
      dispatch(filterCountries(continent));
    }
   

  };

  const handleOrder = (orderType, sortOrder) => {
    dispatch(orderCountries({ orderType, sortOrder }));
  };

  const handleLogout = () => {
    dispatch(setAccess(false))
    navigate("/")
  };
  const handlerFilterAct = ()=>{
    dispatch(getactUser(email))
    navigate("/activity/filter")
  };
  return (
    <nav className={styles.navBar}>
      <div className={styles.navBrand}>
        <Link to="/home">Países y Nacionalidades</Link>
      </div>
      <SearchBar/>
      <div className={styles.menu}>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={toggleFiltroActividades}>
            Actividades
            <i className={`fa ${filtroActividadesAbierto ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
          {filtroActividadesAbierto && (
            <div className={styles.dropdownContent}>
              <button onClick={handlerActivity}>Crear Actividad</button>
              <button onClick={handlerFilterAct}>Filtrar Actividades</button>
            
            </div>
          )}
        </div>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={toggleFiltroOrden}>
            Order City
            <i className={`fa ${filtroOrdenAbierto ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
          {filtroOrdenAbierto && (
            <div className={styles.dropdownContent}>
              <button onClick={() => handleOrder('name', 'asc')}>Asc</button>
              <button onClick={() => handleOrder('name', 'desc')}>Desc</button>
              <button onClick={() => handleOrder('population', 'asc')} >Poblacion Asc</button>
              <button onClick={() => handleOrder('population', 'desc')} >Poblacion Desc</button>
            </div>
          )}
        </div>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={toggleFiltroCiudades}>
            Filtrar Ciudades
            <i className={`fa ${filtroCiudadesAbierto ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
          {filtroCiudadesAbierto && (
            <div className={styles.dropdownContent}>
              <button onClick={() => handleContinentFilter('Asia')}>Asia</button>
              <button onClick={() => handleContinentFilter('Europe')}>Europa</button>
              <button onClick={() => handleContinentFilter('North America')}>North America</button>
              <button onClick={() => handleContinentFilter('South America')}>South America</button>
              <button onClick={() => handleContinentFilter('Africa')}>Africa</button>
              <button onClick={() => handleContinentFilter('Oceania')}>Oceania</button>
              <button onClick={() => handleContinentFilter('All')}>Todos</button>
            </div>
          )}
        </div>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </nav>
  );
};

export default Nav;
