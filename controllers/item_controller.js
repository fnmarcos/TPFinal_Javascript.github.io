const Item = require('../models/item_models');
var LOGGED = '';

module.exports = {

  sendItems: async (req, res) => {

    const { nombreUsuario } = req.body;
    let user = nombreUsuario;
    LOGGED = user;
  },

  getItems: async (req, res) => {
    res.json(LOGGED);
  },

  addItem: async (req, res) => {

    const { nombreUsuario, correoElectronico, contrasena } = req.body;
    let user = nombreUsuario;

    if (!nombreUsuario || !correoElectronico || !contrasena) {
      return res.json({ message: 'Error: Todos los campos son obligatorios' });
    }

    const item = new Item({
      nombreUsuario,
      correoElectronico,
      contrasena
    });

    try {

      const verficacionUsuario = await Item.find({ nombreUsuario: user })

      if (!verficacionUsuario || verficacionUsuario == '') {
        const newItem = await item.save();
        return res.json({ message: 'Registro exitoso' });
      }
      else {
        return res.json({ message: 'Error: El usuario ya existe' });
      }

    } catch (error) {
      console.error('Error al agregar el elemento:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  verifyItem: async (req, res) => {

    const { nombreUsuario, correoElectronico, contrasena } = req.body;
    let user = nombreUsuario;
    let pass = contrasena;

    if (!nombreUsuario || !correoElectronico || !contrasena) {
      return res.json({ message: 'Error: Todos los campos son obligatorios' });
    }

    try {
      const items = await Item.find({ nombreUsuario: user })

      if (!items || items == '') {
        return res.json({ message: 'Error: Usuario no encontrado' });
      }
      else {
        if (pass != items[0].contrasena)
          return res.json({ message: 'Error: Contraseña incorrecta' });
        else {
          return res.json({ message: 'Acceso concedido' });
        }
      }

    } catch (error) {
      console.error('Error al obtener los elementos:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

};
