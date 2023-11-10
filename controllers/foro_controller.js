const Foro = require('../models/foro_models');

module.exports = {

  getPosts: async (req, res) => {

    const foroUser = req.params.id;

    try {
      const posteos = await Foro.find({ autor: foroUser });
      res.json(posteos);

    } catch (error) {
      console.error('Error al obtener los elementos:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  getInfoPosts: async (req, res) => {

    const foroId = req.params.id;

    try {
      const post = await Foro.find({ _id: foroId });
      res.json(post);

    } catch (error) {
      console.error('Error al obtener los elementos:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  postComentario: async (req, res) => {

    const { _id, participante, contenido } = req.body;

    const idPost = _id;

    try {

      const newComentario = {
        participante,
        contenido
      };

      const agregarComentario = await Foro.updateOne(
        { _id: idPost },
        { $push: { mensajes: newComentario } },
      )

      return res.json({ message: 'Registro exitoso' });

    } catch (error) {
      console.error('Error al agregar comentario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
};