import { allPacientes, obtainCitas, obtainMEspecialidad, findCita } from "../controller/controller.js";
import { Router } from "express";

const router = Router();

router.get('/pacientes',allPacientes);
router.post('/fecha',obtainCitas);
router.post('/medico',obtainMEspecialidad);
router.post('/find',findCita);

export default router