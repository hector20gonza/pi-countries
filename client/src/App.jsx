import { useEffect,useState } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './App.css'
import LandingPage from './Views/Landing/Landing';
import Home from './Views/Home/Home';
import DetailCountry from './components/DetailCountry/DetailCountry';
import Nav from './components/Nav/Nav';
import FormActivity from './Views/FormActivity/FormActivity';

function App() {
  const [aux, setAux] = useState(false);
  const acces= useSelector((state) => state.access)

  const navigate = useNavigate();

 console.log(acces)
 

  useEffect(() => {
    if (!acces) {
      navigate("/");
    }
  }, [acces, navigate]);
  return (
    <div >
        {location.pathname !== "/" && <Nav  />}
      <Routes>
       <Route exact  path="/" element={<LandingPage />} />
       <Route path="/home" element={<Home aux={aux}/>} />
       <Route path="/detail/:id" element={<DetailCountry />} />
       <Route path="/activity" element={<FormActivity />} />
       </Routes>

  </div>
  )
}

export default App
