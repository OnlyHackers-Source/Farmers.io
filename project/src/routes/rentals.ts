import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import prisma from '../lib/prisma';

const router = Router();

// Create a rental order
router.post('/', [

  body('product_id').notEmpty(),
  body('start_date').isISO8601(),
  body('end_date').isISO8601(),
], async (req: Request, res: Response) => {
  try {
    const { product_id, start_date, end_date } = req.body;

    const product = await prisma.product.findFirst({
      where: {
        id: product_id,
        isRental: true
      }
    });

    if (!product) throw new Error('Rental product not found');

    const days = Math.ceil(
      (new Date(end_date).getTime() - new Date(start_date).getTime()) / (1000 * 3600 * 24)
    );
    const total_amount = product.rentalPricePerDay!.toNumber() * days;

    const rental = await prisma.rentalOrder.create({
      data: {
        renterId: req.body.id,
        ownerId: product.ownerId,
        productId: product_id,
        startDate: new Date(start_date),
        endDate: new Date(end_date),
        totalAmount: total_amount,
        status: 'pending'
      },
      include: {
        renter: true,
        owner: true,
        product: true
      }
    });

    res.status(201).json(rental);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Get user's rental orders
router.get('/my-rentals', async (req, res) => {
  try {
    const rentals = await prisma.rentalOrder.findMany({
      where: {
        OR: [
          { renterId: req.body.id },
          { ownerId: req.body.id }
        ]
      },
      include: {
        renter: true,
        owner: true,
        product: true
      }
    });

    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;