import './App.css';
import './pages/Principal';
import { Principal } from './pages/Principal';
import { Estudiantes } from './pages/Estudiantes';
import { Trabajadores } from './pages/Trabajadores';
import { Postgrados } from './pages/Postgrados';
import { Reportes } from './pages/Reportes';
import { AdminPage } from './pages/AdminPage';
import { Login } from './pages/Login';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { useAuth, authFetch, logout } from './libs/auth';
import { useEffect, useState } from 'react';


function App() {
  const [isLogged, session] = useAuth(); 

 
    const [userLogged, setUserLogged] = useState([]);

    useEffect(() => {
      authFetch('http://localhost:8000/getUser')
        .then(r => r.json())
        .then(user => setUserLogged(user))
        .catch(error => logout());
    }, [isLogged]);


  

  return (

    <Router>
      {}
      <div className="App">
      {isLogged && 
      <header>
          <Menu usuario={userLogged} />
          <Header />
      </header>}

          {isLogged && (
            <Routes>
              <Route path='/' element={<Principal />}></Route>
              <Route path='/Estudiantes' element={<Estudiantes />}></Route>
              <Route path='/Trabajadores' element={<Trabajadores />}></Route>
              <Route path='/Postgrados' element={<Postgrados />}></Route>
              <Route path='/Reportes' element={<Reportes />}></Route>
                {userLogged['admin'] ? (
                    <Route path='/AdminPage' element={<AdminPage />}></Route>
                ): ""}
              <Route path='/*' element={<Navigate to="/" />}></Route>
            </Routes>
          )}
         
          {!isLogged && (
            <Routes>
              <Route path='/Login' element={<Login />}></Route>
              <Route path='/*' element={<Navigate to="/Login" />}></Route>
            </Routes>
          )}
        {isLogged && 
        <footer>

          <Footer />
        </footer>}
      </div>
    </Router>
  );
}

export default App;