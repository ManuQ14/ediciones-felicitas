const express = require('express');
const router = express.Router();
const { login, changeAdminPassword } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/change-password', verifyToken, changeAdminPassword);

module.exports = router;
