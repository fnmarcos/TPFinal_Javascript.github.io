const PORT = 3000;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Import routes
const foroRoutes = require("./routes/foro_routes.js");
const itemRoutes = require('./routes/item_routes');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.set('view engine', 'ejs')

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch(error => {
    console.error('Error de conexión a MongoDB:', error);
  });


// Routes
app.use('/foro', foroRoutes)
app.use('/usuarios', itemRoutes);

// Start the server
app.listen(PORT, () => {

  console.log(`Servidor escuchando en http://localhost:${PORT}/`);

});
