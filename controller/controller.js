import { ObjectId } from 'mongodb';
// 1. Obtener todos los pacientes de manera alfabética.
import dotenv from 'dotenv';
dotenv.config();


import { MongoClient } from "mongodb";
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const bdname = process.env.NAME;
client.connect();
const db = client.db(bdname);
console.log("Conectado al la base de datos");


const allPacientes = async (req,res)=>{
    try {
        const coleccion = db.collection('usuarios')
        const data = await coleccion.find().sort({ usuario_nombre: 1 }).toArray();
        res.json(data);
    } catch (error) {
        console.log(error, "error en el punto 1");
    }
}

// 2. Obtener las citas de una fecha en específico , donde se ordene los pacientes de manera alfabética.
const obtainCitas = async (req,res)=>{
    try {
        const colection = db.collection('citas');
        const fecha = new Date(req.body.fecha)  
        const data = await colection.find({cita_fecha:fecha}).toArray();
        res.json(data)
    } catch (error) {
        console.log(error, "error en el punto 3");
    }
}

// 3.Obtener todos los médicos de una especialidad en específico (por ejemplo, ‘Cardiología’).
const obtainMEspecialidad = async(req,res)=>{
    try {
        const colection = db.collection('especialidades');
        const especialidad = req.body.especialidad;
        const data = await colection.aggregate([
            {
                $match: {
                    especialidad_nombre: especialidad,
                },
              },
              {
                $lookup: {
                  from: 'medicos', 
                  localField: '_id', 
                  foreignField: 'medico_especialidad', 
                  as: 'medico',
                },
              },
        ]).toArray();
        res.json(data)
    } catch (error) {
        console.log(error,"error en el punto 3");
    }
}

// 4. Encontrar la próxima cita para un paciente en específico (por ejemplo, el paciente con user_id 1).

const  findCita = async(req,res)=>{
    try {
        const colection = db.collection('usuarios');
        const objectId = new ObjectId(req.body.id);
        const data = await colection.aggregate([
            {
                $match: {
                    _id: objectId, 
                },
              },
              {
                $lookup: {
                  from: 'citas', 
                  localField: '_id', 
                  foreignField: 'cita_datosUsuario',
                  as: 'cita',
                },
              },
        ]).toArray();
        res.json(data)
    } catch (error) {
        console.log(error,"error en el punto 3");
    }
}

// 5. Encontrar todos los pacientes que tienen citas con un médico en específico (por ejemplo, el médico con med_numMatriculaProfesional 1).



// 6. Encontrar todas las citas de un día en específico (por ejemplo, ‘2023-07-12’).

const obtainDayCita = async (req,res)=>{
    try {
        const colection = db.collection('citas');
        const fecha = new Date(req.body.fecha)  
        const data = await colection.find({cita_fecha:fecha}).toArray();
        res.json(data)
    } catch (error) {
        console.log(error, "error en el punto 6");
    }
}

//Obtener todos los médicos con sus consultorios correspondientes.

const medicConsult = async (req,res)=>{
    try {
        const colection = db.collection('consultorios');
        const data = await colection.aggregate([
            {
                $lookup: {
                  from: 'medicos', 
                  localField: '_id', 
                  foreignField: 'medico_consultorio',
                  as: 'medicosAndConsutorios',
                },
              },
        ]).toArray();
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

export {allPacientes, obtainCitas, obtainMEspecialidad, findCita, obtainDayCita, medicConsult}  