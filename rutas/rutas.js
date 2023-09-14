import { allPacientes, obtainCitas, obtainMEspecialidad, findCita, obtainDayCita, medicConsult } from "../controller/controller.js";
import { Router } from "express";

const router = Router();

router.get('/pacientes',allPacientes);
router.post('/fecha',obtainCitas);
router.post('/medico',obtainMEspecialidad);
router.post('/find',findCita);
router.post('/day',obtainDayCita);
router.post('/all',medicConsult);

export default router