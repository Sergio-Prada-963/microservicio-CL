import { MongoClient } from "mongodb";

const conexion = ()=>{
    try { 
        const url = process.env.MONGO_URI;
        const client = new MongoClient(url);
        const bdname = process.env.NAME;
        client.connect();
        const db = client.db(bdname);
        console.log("Conectado al la base de datos");
    } catch (error) {
        console.log(error,"no se conecto a la db");
    }
}

export default conexion;

