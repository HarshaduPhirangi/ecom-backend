const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');
const { addTocart,getcart } = require('../controllers/cartController');


const router = express.Router()

router.post("/add",authMiddleware,addTocart)
router.get("/",authMiddleware,getcart)
// router.post("/remove")

module.exports = router;
