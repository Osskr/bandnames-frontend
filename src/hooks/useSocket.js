import { useEffect, useMemo, useState } from "react";
import  io  from "socket.io-client";

export const useSocket = (serverPath) =>{
  //para local 'http://localhost:8080'
  //necesito obtener el Socket

  // El use memo es para que si el argumento no cambia
  //se sigan usando el mismo socket
  const socket = useMemo(
    () =>
      io.connect(serverPath, {
        transports: ["websocket"],
      }),
    [serverPath]
  );

  //para verificar si esta online u offline
  const [online, setOnline] = useState(false);

  //nos detecta cuando nos conectamos
  useEffect(() => {
    // console.log(socket)
    setOnline(socket.connected);
  }, [socket]);


  // si perdemos la conexion y la recuperamos establecemos el estado en true
  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  //perdemos la conexion establecemos el estado en false
  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

 

  //retorno el socket y el online (el estado en que se encuentra la conexion)
  return {socket ,online}
}

