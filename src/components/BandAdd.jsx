import React, { useContext,  useState } from 'react'
import { SocketContext} from '../context/SocketContext';
export const BandAdd = () => {

    const {socket} = useContext(SocketContext)
    const [valor, setvalor] = useState('')


    const crearBanda = (nombre) => {
       socket.emit("crear-banda", { nombre });
     };

     const onSubmit = (e)=>{
            e.preventDefault()
         

            if(valor.length>=0){
               crearBanda(valor)
            }
        
            setvalor('')
    }
    return (
        <div>
            <h3>Agregar Banda</h3>

            <form action="" onSubmit={onSubmit}>
                <input className="form-control"
                       placeholder="Nuevo Nombre de la banda" type="text" name="" id=""
                       value = {valor}
                       onChange ={ (e)=>setvalor(e.target.value)}/>
            </form>
        </div>
    )
}
