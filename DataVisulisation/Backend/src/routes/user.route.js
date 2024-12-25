import {Router} from 'express';
const router = Router();
import {verifyJWT} from '../middlewares/auth.middleware.js'

import { userRegister,userLogin,userLogout,getUserData } from '../controllers/user.js';

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/logout').post(verifyJWT ,userLogout);
router.route('/dashboard').get(verifyJWT ,getUserData);


export default router;