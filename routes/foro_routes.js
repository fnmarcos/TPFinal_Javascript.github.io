const express = require('express');
const ForoController = require('../controllers/foro_controller');
// const router = express.json();
const router = express.Router();

const bodyParser = require('body-parser');

// Configura bodyParser para procesar datos POST.
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/posts/:id', ForoController.getPosts);
router.get('/post/:id', ForoController.getInfoPosts);
router.post('/comentario/:id', ForoController.postComentario);

module.exports = router;

