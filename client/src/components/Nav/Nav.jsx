import  { useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { filterCountries,orderCountries,setAccess} from '../../redux/actions';
import styles from '../Nav/Nav.module.css';
import SearchBar from '../SearchBar/SearchBar';
const Nav = () => {

  const [filtroAbierto, setFiltroAbierto] = useState(false);
  const [submenuAbierto, setSubmenuAbierto] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const toggleFiltro = () => {
    setFiltroAbierto(!filtroAbierto);
  };

  const toggleSubmenu = () => {
    setSubmenuAbierto(!submenuAbierto);
  };
 const handlerActivity =()=>{
  navigate("/activity");
 }
  const handleContinentFilter = (continent) => {
    if (location.pathname.includes('/detail')) {
      navigate("/home");
    }
    
    const payload = {
      filterType: 'continent',
      filterInfo: continent
    };
   
    dispatch(filterCountries(payload));
  };
  const handleOrder = (orderType, sortOrder) => {
    dispatch(orderCountries({ orderType, sortOrder }));
  };
  const handleLogout = () => {
    dispatch(setAccess(false))
    navigate("/")
  }

  return (
    <nav className={styles.navBar}>
      <div className={styles.navBrand}>
        <Link to="/home">Países y Nacionalidades</Link>
      </div>
      <SearchBar/>
      <div className={styles.menu}>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={toggleFiltro}>
            Actividades
            <i className={`fa ${filtroAbierto ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
          {filtroAbierto && (
            <div className={styles.dropdownContent}>
              <button onClick={handlerActivity}>Crear Actividad</button>
              <button onClick={toggleSubmenu}>Ordernar</button>
              {submenuAbierto && (
                <div className={styles.submenu}>
                  <button>Dificultad 1</button>
                  <button>Dificultad 2</button>
                  <button>Dificultad 3</button>
                  <button>Dificultad 4</button>
               
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={toggleFiltro}>
            Order City
            <i className={`fa ${filtroAbierto ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
          {filtroAbierto && (
            <div className={styles.dropdownContent}>
              <button onClick={() => handleOrder('name', 'asc')}>Asc</button>
              <button onClick={() => handleOrder('name', 'desc')}>Desc</button>
              
              <button onClick={() => handleOrder('population', 'asc')} >Poblacion Asc</button>
              <button onClick={() => handleOrder('population', 'desc')} >Poblacion Desc</button>
            </div>
          )}
        </div>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={toggleFiltro}>
            Filtrar Ciudades
            <i className={`fa ${filtroAbierto ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
          {filtroAbierto && (
            <div className={styles.dropdownContent}>
              <button onClick={() => handleContinentFilter('Asia')}>Asia</button>
              <button onClick={() => handleContinentFilter('Europe')}>Europa</button>
              <button onClick={() => handleContinentFilter('North America')}>North America</button>
              <button onClick={() => handleContinentFilter('South America')}>South America</button>
              <button onClick={() => handleContinentFilter('Africa')}>Africa</button>
              <button onClick={() => handleContinentFilter('Oceania')}>Oceania</button>
              <button onClick={() => handleContinentFilter(null)}>Todos</button>
            </div>
          )}
        </div>
        <div onClick={handleLogout}>Cerrar Sesión</div>
      </div>
    </nav>
  );
};

export default Nav;
