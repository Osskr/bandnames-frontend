import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext()

//children es el componemte que recibimos dentro del provider
export const SocketProvider = ({children}) => {

    //el custom hook del socket
    //const {socket,online} = useSocket('http://localhost:8080')
    const {socket,online} = useSocket('https://bandnamesbackserver.herokuapp.com/')
    return (
        // a través de value ponemos a disposicion lo que queramos en el provider
        <SocketContext.Provider value={{socket,online}}>{children}</SocketContext.Provider>
    )
}