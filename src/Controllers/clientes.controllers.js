import { pool } from "../../db/db.js";

/* Función para traer los clientes: GET */
export const getClientes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Clientes');
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

/* Función para devolver un solo cliente */
export const getCliente = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Clientes WHERE idCliente = ?', [req.params.id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener un cliente:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

/* Función para añadir un cliente: POST */
export const postClientes = async (req, res) => {
  try {
    const { nombre_apellido, telefono, domicilio, codigo_postal, provincia, dni, usuario_ig } = req.body;
    const [rows] = await pool.query('INSERT INTO Clientes (nombre_apellido, telefono, domicilio, codigo_postal, provincia, dni, usuario_ig) VALUES (?, ?, ?, ?, ?, ?, ?)', [nombre_apellido, telefono, domicilio, codigo_postal, provincia, dni, usuario_ig]);
    res.send({
      id: rows.insertId,
      nombre_apellido,
      telefono,
      domicilio,
      codigo_postal,
      provincia,
      dni,
      usuario_ig,
    });
  } catch (error) {
    console.error("Error al añadir un cliente:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/* Función para editar un cliente: PUT */
export const putClientes = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_apellido, telefono, domicilio, codigo_postal, provincia, dni, usuario_ig } = req.body;
    const [result] = await pool.query('UPDATE Clientes SET nombre_apellido = ?, telefono = ?, domicilio = ?, codigo_postal = ?, provincia = ?, dni = ?, usuario_ig = ? WHERE idCliente = ?', [nombre_apellido, telefono, domicilio, codigo_postal, provincia, dni, usuario_ig, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    const [rows] = await pool.query('SELECT * FROM Clientes WHERE idCliente = ?', [id]);
    res.json(rows);
  } catch (error) {
    console.error("Error al editar un cliente:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

/* Función para eliminar un cliente: DELETE */
export const deleteClientes = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Clientes WHERE idCliente = ?', [req.params.id]);
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    console.log(result);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar un cliente:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
