import {Router}  from "express"; 
import {getClientes, getCliente} from '../Controllers/clientes.controllers.js';
import { postClientes } from '../Controllers/clientes.controllers.js';
import { putClientes } from "../Controllers/clientes.controllers.js";
import { deleteClientes } from "../Controllers/clientes.controllers.js";

const router = Router();


router.get('/Clientes', getClientes);

router.get('/Clientes/:id', getCliente);

router.post('/Clientes', postClientes);

router.put('/Clientes/:id', putClientes);

router.delete('/Clientes/:id', deleteClientes);



export default router;