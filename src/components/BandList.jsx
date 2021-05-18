
import React, { useContext, useEffect, useState } from 'react'
import { SocketContext} from '../context/SocketContext';

export const BandList = () => {
    
    const [bands, setBands] = useState([]);
    const {socket} =  useContext(SocketContext)


    //Actualiza el estado de las bandas  si hay nueva informacion de bandas desde el servidor
    useEffect(()=>{

        socket.on("current-bands", (bands) => {
            
                 setBands(bands);
               });
    
        // //si se destruye el bandList hago el dismount
        // return ()=> socket.off()
   
    },[socket, bands])

    //Actualiza el nombre de la banda en el estado
    const cambioNombre = (e, id) => {
        const nuevoNombre = e.target.value

        setBands(bands => bands.map(band=>{

            if(band.id===id){
                band.name = nuevoNombre
            }
            return band
        }))
       
    }

    const onPerdioFoco = (id, nombre) => {
      socket.emit("cambiar-nombre-banda", { id, nombre });
    };

    const votar = (id) => {
      socket.emit("votar-banda", id);
    };

    const borrar = (id) => {
    socket.emit("borrar-banda", id);
    };

    const crearRows = () => {
      return bands.map((band) => (
        <tr key={band.id}>
          <td>
            <button className="btn btn-primary" onClick={() => votar(band.id)}>
              +1
            </button>
          </td>

          <td>
            <input
              type="text"
              className="form-control"
              value={band.name}
              onChange={(e) => cambioNombre(e, band.id)}
              onBlur={() => onPerdioFoco(band.id, band.name)}
            />
          </td>
          <td>
            <h4>{band.votes}</h4>
          </td>
          <td>
            <button className="btn btn-danger" onClick={() => borrar(band.id)}>
              borrar
            </button>
          </td>
        </tr>
      ));
    };
    return (
        <>
                <h3>Bandas Actuales</h3>
            <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Votos</th>
                            <th>Borrar</th>
                        
                        </tr>
                        </thead>
                        <tbody>
                                {crearRows()}
                                
                        </tbody>
                    
            </table>
             
        </>
    )
}
