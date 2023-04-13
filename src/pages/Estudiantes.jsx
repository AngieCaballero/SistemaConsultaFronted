import styles from "../assets/css/Estudiantes.module.css";
import ViewIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import { authFetch } from '../libs/auth';

  

export function Estudiantes() {

    const [value, setValue] = React.useState(new Date());
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [carnet, setCarnet] = useState("18-00155-0");
    //console.log(carnet);
    const [rows, setRows] = React.useState([]);

    const handleClickOpen = React.useCallback((carnett) => () => {
        setCarnet(carnett);
        
      setOpen(true);
    
    }, [],
    );
  
    const handleClose = () => {
      setOpen(false);
    };  

    console.log(carnet);
    /*Conseguir estudiantes */
    useEffect(() => {
      authFetch('http://localhost:8000/getEstudiantes')
        .then(r => r.json())
        .then(est => {
          console.log(est.datos);
          est.datos.forEach((e, i) => {
            e.id=i+1
          })

            setRows(est.datos)
        })
    }, []);

    console.log(rows)

  const columns = React.useMemo(
    () => [
      { field: 'carnet', headerName: "Carnet", type: 'string' },
      { field: 'nombres', headerName: 'Nombres', type: 'string', width: 180 },
      { field: 'apellidos', headerName: 'Apellidos', type: 'string', width: 200 },
      { field: 'correo', headerName: 'Correo', type: 'string', width: 280 },
      { field: 'facultad', headerName: 'Facultad', type: 'string', width: 200 },
      { field: 'nombre_carrera', headerName: 'Carrera', type: 'string', width: 250 },
      { field: 'anyo_est', type: 'number', headerName: "Año de estudio", width: 50 },
      { field: 'tipo_curso', headerName: 'Modalidad', type: 'string', width: 100 },
      { field: 'tipo_matricula', type: 'string', headerName: "Tipo de matricula", width: 130 },
      { field: 'sexo', headerName: 'Sexo', type: 'string', width: 100 },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
            <GridActionsCellItem
              icon={<ViewIcon />}
              label="Ver"
              onClick={handleClickOpen(params.row.carnet)}
              
            />
        ],
      },
    ],
    [],
  );

    return(

        <div>
            <div className={styles.contenedor}>
                <div>
                    <h4>Busqueda de Estudiantes</h4>
                </div>
                <div style={{ height: 550, width: '100%' }}>
              
                    <DataGrid columns={columns} rows={rows} components={{Toolbar: GridToolbar,}}
                    />
                </div>
            </div>
            
            <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            >
                
                <DialogTitle id="responsive-dialog-title">
                    {"Informacion del estudiante"}
                </DialogTitle>
            <DialogContent>
                {rows.filter(c => c.carnet === carnet).map( estudiante => (
                <DialogContentText>
                    <div className={styles.contModal}>
                      <div>
                        <h4><b>Carnet:</b></h4>
                         {estudiante.carnet}
                      </div>
                      <div>
                        <h4><b>Correo:</b></h4>
                        
                      </div>
                      <div>
                        <h4><b>Nombres:</b></h4>
                         {estudiante.nombres}
                      </div>
                      <div>
                        <h4><b>Apellidos:</b></h4>
                        {estudiante.apellidos}
                      </div>
                      <div>
                        <h4><b>Modalidad:</b></h4>
                        {estudiante.tipo_curso}
                      </div>
                      <div>
                        <h4><b>Facultad:</b></h4>
                         {estudiante.facultad}
                      </div>
                      <div>
                        <h4><b>Carrera:</b></h4>
                        {estudiante.nombre_carrera}
                      </div>
                      <div>
                        <h4><b>Año de estudio:</b></h4>
                         {estudiante.anyo_est}
                      </div>
                      <div>
                        <h4><b>Tipo de matrícula:</b></h4>
                        {estudiante.tipo_matricula}
                      </div>
                      
                      <div>
                        <h4><b>Sexo:</b></h4>
                         {estudiante.sexo}
                      </div>
                    </div>
                </DialogContentText>
                ))}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Cerrar
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}