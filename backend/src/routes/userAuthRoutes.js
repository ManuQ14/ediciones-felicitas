const express = require('express');
const router = express.Router();
const { register, login, me, updateProfile, changePassword, deleteAccount } = require('../controllers/userAuthController');
const { verifyUserToken } = require('../middleware/userAuthMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyUserToken, me);
router.put('/me', verifyUserToken, updateProfile);
router.put('/me/password', verifyUserToken, changePassword);
router.delete('/me', verifyUserToken, deleteAccount);

module.exports = router;
