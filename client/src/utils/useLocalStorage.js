import { useState} from 'react';

function useLocalStorage(key, initialValue) {
  // Obtener el valor guardado en el almacenamiento local o utilizar el valor inicial si no existe
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  const setValue = value => {
    try {
      setStoredValue(value); // Actualizas storedValue con el nuevo valor
      window.localStorage.setItem(key, JSON.stringify(value)); // Usas el nuevo valor para guardar en el almacenamiento local
    } catch (error) {
      console.error(error);
    }
  }
    
    
      return [storedValue, setValue];



}

export default useLocalStorage;


