import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import prisma from '../lib/prisma';

const router = Router();

// Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        owner: true
      }
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Create a product
router.post('/', [

  body('name').notEmpty(),
  body('price').isNumeric(),
  body('quantity').isNumeric(),
  body('category').notEmpty()
], async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity, category, isRental, rentalPricePerDay } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        quantity,
        category,
        ownerId: req.body.id,
        isRental: isRental || false,
        rentalPricePerDay: rentalPricePerDay ? parseFloat(rentalPricePerDay) : null
      },
      include: {
        owner: true
      }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;