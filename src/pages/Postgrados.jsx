import React, { useState } from 'react';
import styles from "../assets/css/Estudiantes.module.css";
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import ViewIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const initialRows = [
    {
        id: 1,
        Carnet: "18-00155-0",
        Cedula: "888-050389-0012L",
        Contraseña: "PG4B7",
        Nombres: "Angie Jazmín",
        Apellidos: "Caballero Munguía",
        Correo_institucional: "angie.caballero118@post.unanleon.edu.ni",
        Correo: "angiejcaballerom@gmail.com",
        Sexo: "Femenino",
        Facultad: "Ciencias y Tecnología",
        Nombre_de_Postgrado: "Ing. Sistemas de Información",
        Periodo_de_estudio: 2,
        
    },
    {
        id: 2,
        Carnet: "18-02071-0",
        Cedula: "532-080688-0012G",
        Contraseña: "VBDDB",
        Nombres: "Ofilio",
        Apellidos: "Herdocia Aráuz",
        Correo_institucional: "ofilio.herdocia118@post.unanleon.edu.ni",
        Correo: "",
        Sexo: "Masculino",
        Facultad: "Ciencias y Tecnología",
        Nombre_de_Postgrado: "Ing. Sistemas de Información",
        Periodo_de_estudio: 2,
        
    },
  ];

export function Postgrados() {

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [carnet, setCarnet] = useState("18-00155-0");
  //console.log(carnet);
  const [rows, setRows] = React.useState(initialRows);

  const handleClickOpen = React.useCallback((carnett) => () => {
      setCarnet(carnett);
      
    setOpen(true);
  
  }, [],
  );

  const handleClose = () => {
    setOpen(false);
  };  

  const columns = React.useMemo(
    () => [
      { field: 'Carnet', type: 'number' },
      { field: 'Cedula', type: 'string', width: 180 },
      { field: 'Contraseña', type: 'string', width: 90 },
      { field: 'Nombres', type: 'string', width: 180 },
      { field: 'Apellidos', type: 'string', width: 200 },
      { field: 'Correo_institucional', type: 'string', headerName: "Correo Institucional", width: 280 },
      { field: 'Correo', type: 'string', width: 280 },
      { field: 'Sexo', type: 'string', width: 100 },
      { field: 'Facultad', type: 'string', width: 200 },
      { field: 'Nombre_de_Postgrado', type: 'string', headerName: "Nombre de Postgrado", width: 250 },
      { field: 'Periodo_de_estudio', type: 'number', headerName: "Periodo de Estudio", width: 50 }, 
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
              icon={<ViewIcon />}
              label="Ver"
              onClick={handleClickOpen(params.row.Carnet)}
              
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
                <h4>Busqueda de Estudiantes de Postgrados</h4>
            </div>
            
            <div style={{ height: 550, width: '100%' }}>
                <DataGrid columns={columns} rows={rows} components={{
                Toolbar: GridToolbar,
            }} />
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
          {rows.filter(c => c.Carnet === carnet).map( estudiante => (
          <DialogContentText>
              <div className={styles.contModal}>
                <div>
                  <h4><b>Carnet:</b></h4>
                  {estudiante.Carnet}
                </div>
                <div>
                  <h4><b>Cedula:</b></h4>
                  {estudiante.Cedula}
                </div>
                <div>
                  <h4><b>Nombres:</b></h4>
                  {estudiante.Nombres}
                </div>
                <div>
                  <h4><b>Apellidos:</b></h4>
                  {estudiante.Apellidos}
                </div>
                <div>
                  <h4><b>Sexo:</b></h4>
                  {estudiante.Sexo}
                </div>
                <div>
                  
                </div>
                <div>
                  <h4><b>Facultad:</b></h4>
                  {estudiante.Facultad}
                </div>
                <div>
                  <h4><b>Nombre de Postgrado:</b></h4>
                  {estudiante.Nombre_de_Postgrado}
                </div>
                <div>
                  <h4><b>Periodo de estudio:</b></h4>
                  {estudiante.Periodo_de_estudio}
                </div>
                <div>
                  <h4><b>Contraseña:</b></h4>
                  {estudiante.Contraseña}
                </div>
                <div>
                  <h4><b>Correo Institucional:</b></h4>
                  {estudiante.Correo_institucional}
                </div>
                <div>
                  <h4><b>Correo alterno:</b></h4>
                  {estudiante.Correo}
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