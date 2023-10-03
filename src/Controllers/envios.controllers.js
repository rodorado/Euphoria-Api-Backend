import { pool } from "../../db/db.js";

/* Función para traer los envíos: GET */
export const getEnvios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Envios');
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener envíos:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

/* Función para devolver un solo envío */
export const getEnvio = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Envios WHERE idEnvio = ?', [req.params.id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: 'Envío no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener un envío:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

/* Función para añadir un envío: POST */
export const postEnvios = async (req, res) => {
  try {
    const { idEnvio, monto_total, estado, idCliente, idProducto } = req.body;
    const [rows] = await pool.query('INSERT INTO Envios (idEnvio, monto_total, estado, idCliente, idProducto) VALUES (?, ?, ?, ?, ?)', [idEnvio, monto_total, estado, idCliente, idProducto]);
    res.send({
      idEnvio,
      monto_total,
      estado,
      idCliente,
      idProducto,
    });
  } catch (error) {
    console.error("Error al añadir un envío:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/* Función para editar un envío: PUT */
export const putEnvios = async (req, res) => {
  try {
    const { id } = req.params;
    const { idEnvio, monto_total, estado, idCliente, idProducto } = req.body;
    const [result] = await pool.query('UPDATE Envios SET idEnvio = ?, monto_total = ?, estado = ?, idCliente = ?, idProducto = ? WHERE idEnvio = ?', [idEnvio, monto_total, estado, idCliente, idProducto, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Envío no encontrado' });
    }
    const [rows] = await pool.query('SELECT * FROM Envios WHERE idEnvio = ?', [id]);
    res.json(rows);
  } catch (error) {
    console.error("Error al editar un envío:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

/* Función para eliminar un envío: DELETE */
export const deleteEnvios = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Envios WHERE idEnvio = ?', [req.params.id]);
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: 'Envío no encontrado' });
    }
    console.log(result);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar un envío:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
