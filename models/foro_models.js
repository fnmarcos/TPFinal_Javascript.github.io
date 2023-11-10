const mongoose = require('mongoose');

const foroSchema = new mongoose.Schema({
  autor: String,  // Lista de usuarios que participan en la conversación
  titulo: String,
  mensajes: [{ participante: String, contenido: String }]
});

module.exports = mongoose.model('Posts', foroSchema);