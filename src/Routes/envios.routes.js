import {Router}  from "express"; 
import { getEnvios, getEnvio} from '../Controllers/envios.controllers.js';
import { postEnvios } from '../Controllers/envios.controllers.js';
import { putEnvios } from "../Controllers/envios.controllers.js";
import { deleteEnvios } from "../Controllers/envios.controllers.js";

const router = Router();


router.get('/Envios', getEnvios);

router.get('/Envios/:id', getEnvio);

router.post('/Envios', postEnvios);

router.put('/Envios/:id', putEnvios);

router.delete('/Envios/:id', deleteEnvios);



export default router;