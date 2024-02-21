import Country from "../Country/Country";
import { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import styles from '../Home/Home.module.css'
const itemsPerPage = 15;

const HomeComp = () => {
  
  const filteredCountries = useSelector((state) => state.filteredCountries);
 
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula los índices de inicio y fin para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    // Restablecer el paginado cuando cambian los filtros
    setCurrentPage(1)
   
  }, [filteredCountries]);
  console.log("Filtered Countries:", filteredCountries); 
  return (
    <>
      <div className={styles.homeContainer}>
        {filteredCountries.slice(startIndex, endIndex).map((item, index) => (
          <div className={styles.countriesContainer} key={index}>
           
            <Country
              position={index}
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              region={item.region}
           
            />
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= filteredCountries.length}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default HomeComp;
