import styles from "../assets/css/Menu.module.css";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import { logout } from "../libs/auth";
import userIcon from '../assets/img/user.png';
import { useAuth, authFetch } from '../libs/auth';

export function Menu(props) {

  const { usuario } = props;

  const [estado, setEstado] = useState(false);

  function handleAbrirMenu(){
    
    if(estado){
      setEstado(false);
    }
    else{
      setEstado(true);
    }
  }

  function cerrarSesion(){

    logout();
    
  }

    return (

      <nav className={estado ? styles.menuActive : styles.menuInactive}>
          <IconButton
          aria-label="more"
          color="inherit"
          edge="end"
          sx={{ mr: 2 }}
          className={styles.btnMenu}
          onClick={handleAbrirMenu}
        >
          {!estado ? <MenuIcon className={styles.icono} /> : <CloseIcon className={styles.icono} />}

        </IconButton>

        <div >
          <img src={userIcon} alt="" />
          <div className={styles.user}>{usuario['name']}</div>
          <Divider variant="middle" className={styles.divisor} />
          <div className={styles.op}>
            <Link to={'/'} className={styles.links}>Principal</Link>
            <Link to={'/Estudiantes'} className={styles.links}>Buscar Estudiantes</Link>
            <Link to={'/trabajadores'} className={styles.links}>Buscar Trabajadores</Link>
            <Link to={'/Postgrados'} className={styles.links}>Buscar Estudiantes de Postgrado</Link>
            <Link to={'/Reportes'} className={styles.links}>Reportes</Link>
            {usuario['admin'] ?
            <Link to={'/AdminPage'} className={styles.links}>Gestion de usuarios</Link> : ""
            }
            <Link to={'/'} className={styles.links} onClick={cerrarSesion}>Cerrar sesion</Link>
          </div>
        </div>

      </nav>

    );

}