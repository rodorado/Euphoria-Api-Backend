import { pool } from "../../db/db.js";

/* Función para traer los usuarios: GET */
export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Usuarios');
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

/* Función para devolver un solo usuario */
export const getUser = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE idUsuario = ?', [req.params.id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener un usuario:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

/* Función para añadir un usuario: POST */
export const postUsuarios = async (req, res) => {
  try {
    const { mail, contraseña } = req.body;
    const [rows] = await pool.query('INSERT INTO Usuarios (mail, contraseña) VALUES (?, ?)', [mail, contraseña]);
    res.send({
      id: rows.insertId,
      mail,
      contraseña,
    });
  } catch (error) {
    console.error("Error al añadir un usuario:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/* Función para editar un usuario: PUT */
export const putUsuarios = async (req, res) => {
  try {
    const { id } = req.params;
    const { mail, contraseña } = req.body;
    const [result] = await pool.query('UPDATE Usuarios SET mail = ?, contraseña = ? WHERE idUsuario = ?', [mail, contraseña, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE idUsuario = ?', [id]);
    res.json(rows);
  } catch (error) {
    console.error("Error al editar un usuario:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

/* Función para eliminar un usuario: DELETE */
export const deleteUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Usuarios WHERE idUsuario = ?', [req.params.id]);
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    console.log(result);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar un usuario:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
