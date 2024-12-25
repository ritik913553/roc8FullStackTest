import { Router } from "express";

const router = Router();    


import {uploadspreadData} from "../controllers/uploadspreadData.js";



router.route('/fetch').get(uploadspreadData);

export default router;