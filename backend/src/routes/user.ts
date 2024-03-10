import { Router } from 'express';
import { Login, completeUser, deleteUser, getUser,  newUser, updateRole } from '../controllers/user.js';
import adminOnly, { verifyTokenMiddleware } from '../middlewares/auth.js';

const router = Router();

router.post('/signup',newUser);
router.post('/signup/verification',completeUser);
router.post('/login',Login);

router.put('/role',verifyTokenMiddleware,updateRole);

router.route('/:email').get(getUser).delete(adminOnly,deleteUser)


export default router;