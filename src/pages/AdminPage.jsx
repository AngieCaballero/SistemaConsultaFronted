import React, { useState, useEffect } from 'react';
import styles from "../assets/css/Estudiantes.module.css";
import stylesAdmin from "../assets/css/AdminPage.module.css";
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { authFetch } from '../libs/auth';
import SecurityIcon from '@mui/icons-material/Security';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import ToggleButton from '@mui/material/ToggleButton';
import Alert from '@mui/material/Alert';

export function AdminPage() {

    /* Hoocks */  
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [id, setId] = useState(4544);
    const [estado, setEstado] = useState(false);
    const [rows, setRows] = React.useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const [values, setValues] = useState({
      id: 1,
      name: '',
      password: '',
      admin: false
    });

    /* Eventos: Conseguir nuevo valores de usuario */
    const handleChange = (prop) => (event) => {
      
        setShowError(false);
        setValues({ ...values, [prop]: event.target.value });
      
    };

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    /*Evento editar usuario*/
    const handleClickOpenEdit = React.useCallback((idd) => (event) => {
        setId(idd);
        var u = rows.find(c => c.id === idd);
        setValues({ id: idd, name: u.name, password: "" })
        setOpenEdit(true);
      }, [rows],
      );

      const handleClickOpenCreate = () => {
        setOpenCreate(true);
      };

    const handleClickDelete = React.useCallback((idd) => () => {
      setId(idd);

      authFetch('http://localhost:8000/deletetUser/' + idd)
        .then(r => r.json())
        .then(m => {})
        setEstado(!estado);
  }, [estado],
  );
  
    const handleCloseEdit = () => {
      setOpenEdit(false);
    };

    const handleCloseCreate = () => {
      setOpenCreate(false);
    };

    /*Cambiar permiso de usuario */
    const toggleAdmin = React.useCallback(
      (idd) => () => {
        authFetch('http://localhost:8000/changeAdmin/' + idd)
        .then(r => r.json())
        .then(m => {})
        setEstado(!estado);
      },
      [estado],
    );

    /* Conseguir usuarios */
    useEffect(() => {
      authFetch('http://localhost:8000/getUsers')
        .then(r => r.json())
        .then(users => setRows(users))
    }, [estado]);

    /* Crear nuevo usuario */
    const handleSubmitCreate = (event) => {
      event.preventDefault();
      const user = values;
      delete user['id'];
      if(user['name'].length < 5 || user['password'].length < 6){
        if(user['name'].length < 5){
          setError('El nombre de usuario debe contener al menos 5 caracteres');
          setShowError(true);
        }else if(user['password'].length < 6){
          setError('La contraseña debe contener al menos 6 caracteres');
          setShowError(true);
        }
      }
      else 
      {
        setShowError(false);
    
        try{
          authFetch('http://localhost:8000/createUser',{
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(user)
          });
          setEstado(!estado);
          setValues({ id: 1, name: "", password: "", admin: false })
          setOpenCreate(false);
        }catch (error)
        {
          console.error(error);
        }
      }
    }

    /*Editar usuario */
    const handleSubmitEdit = async (event) => {
      event.preventDefault();
      const user = values;
      delete user['admin'];
      if(user['name'].length < 5 || (user['password'].length < 6 && user['password'].length > 0))
      {
        if(user['name'].length < 5)
        {
          setError('El nombre de usuario debe contener al menos 5 caracteres');
          setShowError(true);
        }
        else if(user['password'].length < 6)
        {
          setError('La contraseña debe contener al menos 6 caracteres');
          setShowError(true);
        }
      }
      else {
      setShowError(false);
        try{
          authFetch('http://localhost:8000/editUser',{
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(user)
          });
          setEstado(!estado);
          setValues({ id: 1, name: "", password: "", admin: false })
          setOpenEdit(false);
        }
        catch (error)
        {
          console.error(error);
        }
      }
    }

  const columns = React.useMemo(
    () => [
      { field: 'id', type: 'number', width: 80 },
      { field: 'name', type: 'string', headerName: "Usuario", width: 150},
      { field: 'admin', type: 'boolean', headerName: "Administrador", width: 150 },
      { field: 'created_at', type: 'string', headerName: "Fecha de creación", width: 200 },
      { field: 'updated_at', type: 'string', headerName: "Última actualización", width: 200 },
      {
        field: 'actions',
        type: 'actions',
        width: 120,
        getActions: (params) => [
            <GridActionsCellItem 
            icon={<EditIcon />} 
            label="Edit"
            onClick={handleClickOpenEdit(params.id)} />,
            <GridActionsCellItem 
            icon={<DeleteIcon />} 
            label="Delete"
            onClick={handleClickDelete(params.id)} />,

            <GridActionsCellItem
            icon={<SecurityIcon />}
            label="Cambiar permisos"
            onClick={toggleAdmin(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [handleClickOpenEdit, handleClickDelete, toggleAdmin]
  );

  return (
    <div>
      <div className={styles.contenedor}>
        <div>
            <h4>Gestión de usuarios</h4>
        </div>

        <div className={stylesAdmin.ContNuevo}>
          <ToggleButton value="Add" onClick={handleClickOpenCreate}>
            <AddIcon />
          </ToggleButton>
        </div>

        <div style={{ height: 350, width: '100%' }}>
          <DataGrid columns={columns} rows={rows} components={{
              Toolbar: GridToolbar,
            }} />
        </div>
      </div>

      <Dialog
      fullScreen={fullScreen}
      open={openEdit}
      onClose={handleCloseEdit}
      aria-labelledby="responsive-dialog-title"
      >
        <form action="" onSubmit={(event) => handleSubmitEdit(event)}>
          <DialogTitle id="responsive-dialog-title">
              {"Editar usuario"}
          </DialogTitle>
          <DialogContent>
            {rows.filter(c => c.id === id).map( user => (
              <div key={user.id}>
                <div>
                  {showError ? <Alert severity="error">{error}</Alert> : ""}
                </div>
                <div className={styles.contModalEdit}>
                  <div>
                    <TextField id="standard-basic" onChange={handleChange('name')} defaultValue={user.name} label="Nombre de ususario" variant="standard" />
                  </div>
                  <div>
                  <FormControl sx={{ m: 0, width: '24ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                        </FormControl>
                  </div>
                </div>
              </div>
            ))}
          </DialogContent>
          <DialogActions>
          <Button autoFocus type="submit">
              Guardar
            </Button>
            <Button onClick={handleCloseEdit}>
              Cerrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      
      <Dialog
      fullScreen={fullScreen}
      open={openCreate}
      onClose={handleCloseCreate}
      aria-labelledby="responsive-dialog-title"
      >
        <form action="" onSubmit={(event) => handleSubmitCreate(event)}>
          <DialogTitle id="responsive-dialog-title">
              {"Crear nuevo usuario"}
          </DialogTitle>
          <DialogContent>
            <div>
              {showError ? <Alert severity="error">{error}</Alert> : ""}
            </div>
            <div className={styles.contModalEdit}>
              <div>
                <TextField id="standard-basic" onChange={handleChange('name')} label="Nombre de ususario" variant="standard" />
              </div>
              <div>
                <FormControl sx={{ m: 0, width: '24ch' }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                    <Input
                      id="standard-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={handleChange('password')}
                      endAdornment={
                      <InputAdornment position="end">
                          <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                      </InputAdornment>
                      }
                    />
                </FormControl>
              </div>
              <div>
                <h4>Tipo de usuario:</h4>
                <RadioGroup row aria-labelledby="demo-error-radios" name="admin" value={values.admin} onChange={handleChange('admin')}>
                  <FormControlLabel value={true} control={<Radio />} label="Administrador" />
                  <FormControlLabel value={false} control={<Radio />} label="Usuario común" />
                </RadioGroup>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
          <Button autoFocus type="submit">
              Guardar
            </Button>
            <Button onClick={handleCloseCreate}>
              Cerrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
}

