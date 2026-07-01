import 'dotenv/config'; // Esto reemplaza a require('dotenv').config()
import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar que el servidor vive
app.get('/', (req, res) => {
  res.send('El servidor está vivo y funcionando en la nube');
});

// Configuración del puerto para Render o local
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});