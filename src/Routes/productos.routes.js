import {Router}  from "express"; 
import { getProductos, getProducto} from '../Controllers/productos.controllers.js';
import { postProductos } from '../Controllers/productos.controllers.js';
import { putProductos } from "../Controllers/productos.controllers.js";
import { deleteProductos } from "../Controllers/productos.controllers.js";

const router = Router();


router.get('/Productos', getProductos);

router.get('/Productos/:id', getProducto);

router.post('/Productos', postProductos);

router.put('/Productos/:id', putProductos);

router.delete('/Productos/:id', deleteProductos);



export default router;