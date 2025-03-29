import { Request, Response, Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Get user profile
router.get('/me', async (req, res) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: req.body.id }
    });

    if (!profile) throw new Error('Profile not found');
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Update user profile
router.put('/me', async (req: Request, res: Response) => {
  try {
    const { fullName, phone, address } = req.body;

    const profile = await prisma.profile.update({
      where: { id: req.body.id },
      data: {
        fullName,
        phone,
        address
      }
    });

    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;