import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
const router = Router();

router.post('/signup', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('full_name').notEmpty(),
  body('user_type').isIn(['farmer', 'wholesaler']),
  body('phone').notEmpty(),
  body('address').notEmpty()
], async (req: Request, res: Response) => {
  try {
    const { email, password, name, role, phone, address } = req.body;


    const user = await prisma.profile.create({
      data: {
        email,
        fullName: name,
        role: role,
        phone,
        address,
        password: await bcrypt.hash(password, 10)
      }
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
    console.log(error)

  }
});

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.profile.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
});

export default router;