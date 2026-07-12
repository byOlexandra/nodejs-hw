import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUserSchema } from '../validations/authValidation';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), )

export default router;
