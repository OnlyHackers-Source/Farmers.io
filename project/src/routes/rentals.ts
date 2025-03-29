import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import prisma from '../lib/prisma';

const router = Router();

// Create a rental order
// POST /api/rentals - Add a rental request
router.post('/create', async (req, res) => {
  try {
    const { equipmentType, startDate, endDate, purpose, contactNumber, deliveryAddress, renterId } = req.body;

    // Validation
    if (!equipmentType || !startDate || !endDate || !purpose || !renterId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const rental = await prisma.rentalOrder.create({
      data: {
        equipmentType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        purpose,
        contactNumber: contactNumber || null,
        deliveryAddress: deliveryAddress || null,
        renterId,
        status: 'pending', // Initial status
      },
    });

    res.status(201).json({
      message: 'Rental request submitted successfully',
      rental,
    });
  } catch (error) {
    console.error('Failed to submit rental request:', error);
    res.status(500).json({ error: 'Failed to submit rental request' });
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