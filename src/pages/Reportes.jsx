import styles from "../assets/css/Reportes.module.css";


export function Reportes() {

const Facultades = 
                [
                    { 
                        Facultad: "Ciencias y Tecnología", 
                        Regular: 676, 
                        Sabatino: 779,
                        Dominical: 533,
                        Nocturno: 400,
                        Trabajadores: 543,
                    }, 
                    { 
                        Facultad: "Ciencias Agrarias y Veterinarias", 
                        Regular: 676, 
                        Sabatino: 779,
                        Dominical: 533,
                        Nocturno: 400,
                        Trabajadores: 543,
                    },
                    { 
                        Facultad: "Ciencias y Humanidades", 
                        Regular: 676, 
                        Sabatino: 779,
                        Dominical: 533,
                        Nocturno: 400,
                        Trabajadores: 543,
                    }, 
                    { 
                        Facultad: "Ciencias Económicas", 
                        Regular: 676, 
                        Sabatino: 779,
                        Dominical: 533,
                        Nocturno: 400,
                        Trabajadores: 543,
                    },
                    { 
                        Facultad: "Ciencias Jurídicas y Sociales", 
                        Regular: 676, 
                        Sabatino: 779,
                        Dominical: 533,
                        Nocturno: 400,
                        Trabajadores: 543,
                    }, 
                    { 
                        Facultad: "Ciencias Médicas", 
                        Regular: 676, 
                        Sabatino: 779,
                        Dominical: 533,
                        Nocturno: 400,
                        Trabajadores: 543,
                    },
                    { 
                        Facultad: "Ciencias Quimicas", 
                        Regular: 676, 
                        Sabatino: 779,
                        Dominical: 533,
                        Nocturno: 400,
                        Trabajadores: 543,
                    }, 
                    { 
                        Facultad: "CUR-Somotillo", 
                        Regular: 676, 
                        Sabatino: 779,
                        Dominical: 533,
                        Nocturno: 400,
                        Trabajadores: 543,
                    },
                    { 
                        Facultad: "CUR-Jinotega", 
                        Regular: 676, 
                        Sabatino: 779,
                        Dominical: 533,
                        Nocturno: 400,
                        Trabajadores: 543,
                    }, 
                    { 
                        Facultad: "Odontología", 
                        Regular: 676, 
                        Sabatino: 779,
                        Dominical: 533,
                        Nocturno: 400,
                        Trabajadores: 543,
                    }
                ];

    return (

        <div className={styles.reportes}>

            <h3>Reporte General</h3>
            
            
                <div className={styles.contenedor}>
                    <table>
                        <tr>
                            <th>Facultad</th>
                            <th>Regular</th>
                            <th>Nocturno</th>
                            <th>Sabatino</th>
                            <th>Dominical</th>
                            <th>Trabajadores</th>
                        </tr>
                        
                        {Facultades.map(f => 
                        <tr>
                            <th>{f.Facultad}</th>
                            <td>{f.Regular}</td>
                            <td>{f.Nocturno}</td>
                            <td>{f.Sabatino}</td>
                            <td>{f.Dominical}</td>
                            <td>{f.Trabajadores}</td>
                        </tr>

                        )}
                    </table>
                </div>
                
        
        </div>

    );
}