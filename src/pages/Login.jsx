import styles from "../assets/css/Login.module.css";
import * as React from 'react';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from "../assets/img/Logo_Blanco_UNAN_Leon.png";
import { login } from "../libs/auth";
import { useNavigate  } from "react-router-dom";
import userIcon from '../assets/img/user.png';
import Alert from '@mui/material/Alert';
  

export function Login() {

    const navigate = useNavigate();
    const [access, setAccess] = useState(true);

    const [values, setValues] = useState({
        name: '',
        password: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const user = values;
        const formData = new FormData(); 
        formData.append('name', user['name']);
        delete user['showPassword'];     
        try{
            let response = await fetch('http://localhost:8000/login',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( user)
            });
            response = await response.json();
            login(response);
            navigate('/');
        }catch (error){
            setAccess(false);
            console.error(error);
        }
    }

    return (

        <div className={styles.fondo}>
            <div className={styles.logo}>
                <img src={logo} alt="" />
                <h2>Acceso a servicios informáticos UNAN-León</h2>
                <h3>División de Informática</h3>
            </div>
            <div className={styles.login}>
                <form action="" onSubmit={(event) => handleSubmit(event)}>
                    <h3>Acceso al sistema</h3>
                    <img src={userIcon} alt="" className={styles.userIcon} />
                    {!access ? <Alert severity="error">Usuario o contraseña incorrectos!</Alert> : ""}
                    <div>
                        <TextField id="standard-basic" onChange={handleChange('name')} label="Nombre de ususario" variant="standard" />
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, width: '22ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                        </FormControl>
                    </div>
                    <div>
                        <Button 
                            type="submit"
                            variant="contained">
                                Acceder
                        </Button>
                    </div>
                </form>
            </div>
        </div>

    );

}
