import {Router}  from "express"; 
import {getUsuarios, getUser} from '../Controllers/usuarios.controllers.js';
import { postUsuarios } from '../Controllers/usuarios.controllers.js';
import { putUsuarios } from "../Controllers/usuarios.controllers.js";
import { deleteUsuarios } from "../Controllers/usuarios.controllers.js";

const router = Router();


router.get('/usuarios', getUsuarios);

router.get('/usuarios/:id', getUser);

router.post('/usuarios', postUsuarios);

router.put('/usuarios/:id', putUsuarios);

router.delete('/usuarios/:id', deleteUsuarios);



export default router;