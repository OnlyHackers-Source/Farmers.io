import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import prisma from '../lib/prisma';

const router = Router();

// Get all products
router.get('/get', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        owner: {
          select: {
            fullName: true, // Fetch farmer's name
          },
        },
      },
    });

    // Transform data to match frontend expectations
    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      farmer: product.owner.fullName,
      location: 'Unknown', // Add a location field to Product model if needed
      price: Number(product.price), // Convert Decimal to number
      quantity: product.quantity.toString(), // Convert Int to string
      category: product.category.toLowerCase(),
      image: 'https://via.placeholder.com/500', // Placeholder; add image field later
      rating: 4.5, // Static for now; add rating field if needed
      reviews: Math.floor(Math.random() * 300), // Random for now; add reviews field if needed
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create a product
router.post('/add', async (req, res) => {
  try {
    const { name, category, price, quantity, description } = req.body;

    // Basic validation
    if (!name || !price || !quantity || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get ownerId from localStorage (assuming frontend sends it or use auth later)
    const ownerId = req.body.ownerId; // Temporary fallback

    const newProduct = await prisma.product.create({
      data: {
        name,
        category,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        description: description || null,
        ownerId,
        createdAt: new Date(),
      },
    });

    res.status(201).json({
      message: 'Product added successfully',
      product: newProduct,
    });
  } catch (error) {
    console.error('Failed to add product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

export default router;