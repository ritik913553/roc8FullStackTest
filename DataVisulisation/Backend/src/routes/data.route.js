import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getFilteredData } from "../controllers/data.js";
const router = Router();

router.route('/filter').get(verifyJWT,getFilteredData);

export default router;