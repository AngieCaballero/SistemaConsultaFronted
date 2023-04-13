import styles from "../assets/css/Header.module.css";
import logo from "../assets/img/Logo_Blanco_UNAN_Leon.png";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export function Header() {

    return(
        
        <div className={styles.contenedor}>
            <div>
                <h2>Acceso a servicios informáticos UNAN-León</h2>
                <h3>División de Informática</h3>
            </div>
            <img src={logo} alt="" />
        </div>
        
    );
}
