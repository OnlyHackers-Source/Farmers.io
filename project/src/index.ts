import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import productsRoutes from './routes/products';
import ordersRoutes from './routes/orders';
import rentalsRoutes from './routes/rentals';
import profilesRoutes from './routes/profiles';

dotenv.config();

const app = express();
const port = process.env.PORT || 5003;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

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