import express, { response } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());
// Conexión a MongoDB
connectDB();

// Rutas
app.use('/api', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});