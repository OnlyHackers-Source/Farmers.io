import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth';
import productsRoutes from './routes/products';
import ordersRoutes from './routes/orders';
import rentalsRoutes from './routes/rentals';
import profilesRoutes from './routes/profiles';

dotenv.config();

const app = express();
const port = process.env.PORT || 5003;

// General CORS configuration for API routes
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(helmet());
app.use(express.json());

// Serve static files from "uploads" with CORS enabled
app.use('/uploads', cors({
  origin: 'http://localhost:5173', // Match your frontend origin
}), express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/rentals', rentalsRoutes);
app.use('/profiles', profilesRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Farmers Marketplace API' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});