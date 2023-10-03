import { pool } from "../../db/db.js";

/* Función para traer los productos: GET */
export const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Productos');
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

/* Función para devolver un solo producto */
export const getProducto = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Productos WHERE idProducto = ?', [req.params.id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener un producto:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

/* Función para añadir un producto: POST */
export const postProductos = async (req, res) => {
  try {
    const { nombre, detalle, monto, impuestos } = req.body;
    const [rows] = await pool.query('INSERT INTO Productos (nombre, detalle, monto, impuestos) VALUES (?, ?, ?, ?)', [nombre, detalle, monto, impuestos]);
    res.send({
      id: rows.insertId,
      nombre,
      detalle,
      monto,
      impuestos,
    });
  } catch (error) {
    console.error("Error al añadir un producto:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/* Función para editar un producto: PUT */
export const putProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, detalle, monto, impuestos } = req.body;
    const [result] = await pool.query('UPDATE Productos SET nombre = ?, detalle = ?, monto = ?, impuestos = ? WHERE idProducto = ?', [nombre, detalle, monto, impuestos, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    const [rows] = await pool.query('SELECT * FROM Productos WHERE idProducto = ?', [id]);
    res.json(rows);
  } catch (error) {
    console.error("Error al editar un producto:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

/* Función para eliminar un producto: DELETE */
export const deleteProductos = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Productos WHERE idProducto = ?', [req.params.id]);
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    console.log(result);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar un producto:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
