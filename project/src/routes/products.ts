import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import prisma from '../lib/prisma';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    // Create "uploads" folder if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir); // Store files in "uploads" folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g., 123456789-abc.jpg
  },
});
const upload = multer({ storage });

// Create a product with image upload
router.post('/add', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { name, category, price, quantity, description, ownerId } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    console.log("image, ", image);

    // Basic validation
    if (!name || !price || !quantity || !category || !ownerId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        category,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        description: description || null,
        ownerId,
        image, // Save image path
        createdAt: new Date(),
      },
    });
    console.log("newProduct, ", newProduct)
    res.status(201).json({
      message: 'Product added successfully',
      product: newProduct,
    });
  } catch (error) {
    console.error('Failed to add product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Get all products
router.get('/get', async (req: Request, res: Response) => {
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
      image: product.image ? `http://localhost:5003${product.image}` : 'https://via.placeholder.com/500', // Use stored image or fallback
      rating: 4.5, // Static for now; add rating field if needed
      reviews: Math.floor(Math.random() * 300), // Random for now; add reviews field if needed
    }));

    console.log("formattedProducts", formattedProducts)
    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;