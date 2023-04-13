import styles from "../assets/css/Principal.module.css";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Card } from "../components/Card";
import EstudianteIcon from "../assets/img/Estudiante.png";
import TrabajadorIcon from "../assets/img/Trabajador.png";
import PostgradoIcon from "../assets/img/Postgrado.png";
import ReporteIcon from "../assets/img/Reporte.png";
import { Link } from "react-router-dom";

export function Principal() {

    return (

        <div className={styles.contenedor}>
            <div className={styles.griid}>
                <Link to={'/Estudiantes'} className={styles.links}><Card className={styles.cards} Image={EstudianteIcon} Titulo="Buscar estudiante"/></Link>
                <Link to={'/Trabajadores'} className={styles.links}><Card className={styles.cards} Image={TrabajadorIcon} Titulo="Buscar trabajador"/></Link>
                <Link to={'/Postgrados'} className={styles.links}><Card className={styles.cards} Image={PostgradoIcon} Titulo="Buscar estudiante de postgrado"/></Link>
                <Link to={'/Reportes'} className={styles.links}><Card className={styles.cards} Image={ReporteIcon} Titulo="Reporte general"/></Link>
            </div>
        </div>
        
    );
}