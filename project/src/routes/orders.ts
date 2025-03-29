import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import prisma from '../lib/prisma';

const router = Router();

// Create an order
router.post('/', [

  body('product_id').notEmpty(),
  body('quantity').isNumeric(),
], async (req: Request, res: Response) => {
  try {
    const { product_id, quantity } = req.body;

    const product = await prisma.product.findUnique({
      where: { id: product_id }
    });

    if (!product) throw new Error('Product not found');

    const total_amount = product.price.toNumber() * quantity;

    const order = await prisma.order.create({
      data: {
        buyerId: req.body.id,
        sellerId: product.ownerId,
        productId: product_id,
        quantity,
        totalAmount: total_amount,
        status: 'pending'
      },
      include: {
        buyer: true,
        seller: true,
        product: true
      }
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Get user's orders
router.get('/my-orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          { buyerId: req.body.id },
          { sellerId: req.body.id }
        ]
      },
      include: {
        buyer: true,
        seller: true,
        product: true
      }
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;