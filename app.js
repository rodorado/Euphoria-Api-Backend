import express from "express";
import mysql from 'mysql2';
import UsuariosRutas from './src/Routes/usuarios.routes.js';
import ClientesRutas from './src/Routes/clientes.routes.js';
import ProductosRutas from './src/Routes/productos.routes.js'
import EnviosRutas from './src/Routes/envios.routes.js' 


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '102030',
    port: '3306',   
    database: 'euphoria'
  });

  
  const app = express()
  

  app.use(express.json()); 

  /*Rutas aquí*/
  app.use('/api', UsuariosRutas);
  app.use('/api', ClientesRutas);
  app.use('/api', ProductosRutas);
  app.use('/api', EnviosRutas);
  

  /*If para validar si la ruta existe o no*/
  app.use((req, res, netx) => {
   res.status(404).json({
     message: 'Ruta no encontrada'
   })
  })

   /*IF para ver si está corriendo la base de datos*/
   connection.connect((error) => {
       if (error) {
         console.error('Error al conectar a la base de datos:', error);
       } else {
         console.log('Conexión exitosa a la base de datos.');
       }
     });
   
  export default app; 