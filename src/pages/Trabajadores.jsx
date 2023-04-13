import React, { useState } from 'react';
import styles from "../assets/css/Estudiantes.module.css";
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import ViewIcon from '@mui/icons-material/Visibility';
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
    INSS: "1798",
    Cedula: '323-020488-2311G',
    Nombres: 'Alberto',
    Apellidos: 'Berrios',
    Correo: 'aberrios@cm.unanleon.edu.ni',
    Facultad: 'ACTIVIDADES CENTRALES',
    UnidadAdministrativa: 'RECTORIA',
    Cargo: 'VICE-RECT GENERAL',
    Categoria: 'DO',
    Sexo: 'Masculino',
  },
  {
    id: 2,
    INSS: "2344",
    Cedula: '323-020488-2311G',
    Nombres: 'Nicolas',
    Apellidos: 'Lopez',
    Correo: '	nlopez@cm.unanleon.edu.ni',
    Facultad: 'ACTIVIDADES CENTRALES',
    UnidadAdministrativa: 'RECTORIA',
    Cargo: 'VICE-RECT GENERAL',
    Categoria: 'DO',
    Sexo: 'Masculino',
  },
  {
    id: 3,
    INSS: "3962",
    Cedula: '323-020488-2311G',
    Nombres: 'Kate',
    Apellidos: 'Hernandez',
    Correo: 'khernandez@cm.unanleon.edu.ni',
    Facultad: 'ACTIVIDADES CENTRALES',
    UnidadAdministrativa: 'RECTORIA',
    Cargo: 'VICE-RECT GENERAL',
    Categoria: 'DO',
    Sexo: 'Femenino',
  },
];

export function Trabajadores() {
  const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [inss, setInss] = useState(4544);
    //console.log(carnet);
    const [rows, setRows] = React.useState(initialRows);

    const handleClickOpen = React.useCallback((insss) => () => {
        setInss(insss);
        
      setOpen(true);
    
    }, [],
    );
  
    const handleClose = () => {
      setOpen(false);
    };

  const columns = React.useMemo(
    () => [
      { field: 'INSS', type: 'string' },
      { field: 'Cedula', type: 'string', width: 150 },
      { field: 'Nombres', type: 'string', width: 200 },
      { field: 'Apellidos', type: 'string', width: 200 },
      { field: 'Correo', type: 'string', width: 200 },
      { field: 'Facultad', type: 'string', width: 200 },
      { field: 'UnidadAdministrativa', type: 'string', headerName: "Unidad Administrativa", width: 150 },
      { field: 'Cargo', type: 'string', width: 150 },
      { field: 'Categoria', type: 'string', width: 50 },
      { field: 'Sexo', type: 'string', width: 120 },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
            <GridActionsCellItem
              icon={<ViewIcon />}
              label="Ver"
              onClick={handleClickOpen(params.row.INSS)}
              
            />
        ],
      },
    ],
    [],
  );

  return (
    <div>
      <div className={styles.contenedor}>
        <div>
            <h4>Busqueda de Trabajadores</h4>
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
                    {"Información del estudiante"}
                </DialogTitle>
            <DialogContent>
                {rows.filter(c => c.INSS === inss).map( trabajador => (
                <DialogContentText>
                    <div className={styles.contModal}>
                      <div>
                        <h4><b>INSS:</b></h4>
                         {trabajador.INSS}
                      </div>
                      <div>
                        <h4><b>Cedula:</b></h4>
                        {trabajador.Cedula}
                      </div>
                      <div>
                        <h4><b>Nombres:</b></h4>
                         {trabajador.Nombres}
                      </div>
                      <div>
                        <h4><b>Apellidos:</b></h4>
                        {trabajador.Apellidos}
                      </div>
                      <div>
                        <h4><b>Sexo:</b></h4>
                         {trabajador.Sexo}
                      </div>
                      <div>
                        <h4><b>Correo institucional:</b></h4>
                        {trabajador.Correo}
                      </div>
                      <div>
                        <h4><b>Facultad:</b></h4>
                         {trabajador.Facultad}
                      </div>
                      <div>
                        <h4><b>Unidad Administrativa:</b></h4>
                        {trabajador.UnidadAdministrativa}
                      </div>
                      <div>
                        <h4><b>Cargo:</b></h4>
                         {trabajador.Cargo}
                      </div>
                      <div>
                        <h4><b>Categoría:</b></h4>
                        {trabajador.Categoria}
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