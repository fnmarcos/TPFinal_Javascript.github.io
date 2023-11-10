const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  nombreUsuario: String,
  correoElectronico: String,
  contrasena: String
});

module.exports = mongoose.model('Item', itemSchema);
