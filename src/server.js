require('dotenv').config(); // Carga tus variables de entorno desde el archivo .env
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Aquí irían tus rutas, por ejemplo:
// app.use('/api', tutorRoutes);

// --- CONFIGURACIÓN DEL PUERTO (La parte que necesitabas) ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});