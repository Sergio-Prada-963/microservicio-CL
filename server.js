import express from "express";
import router from "./rutas/rutas.js";


class Server {
    constructor(){
        this.app = express();
        this.app.use(express.json())
        this.port = process.env.PUERTO;
        this.path = {
                    uno: "/api/all",
                    dos: "/api/cita",
                    tres: "/api/especialidad",
                    cuatro: "/api/cita",
                    seis: "/api/citas",
                    siete: "/api/medicos",
                    };
        this.routes();
    }
    routes(){
        this.app.use(this.path.uno,router)
        this.app.use(this.path.dos,router)
        this.app.use(this.path.tres,router)
        this.app.use(this.path.cuatro,router)
        this.app.use(this.path.seis,router)
        this.app.use(this.path.siete,router)
    }
    Listen(){
        this.app.listen(this.port,()=>{
            console.log("escuchando en el puerto 3309");
        })
    }
}
export default Server