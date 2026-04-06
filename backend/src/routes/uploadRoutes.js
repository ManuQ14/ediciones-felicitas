const express = require('express');
const router = express.Router();
const { upload, uploadFile } = require('../controllers/uploadController');
const { verifyToken } = require('../middleware/authMiddleware');

// POST /api/upload/libros  — sube portada de libro
// POST /api/upload/digital — sube archivo digital (PDF/epub)
router.post('/:type', verifyToken, (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    next();
  });
}, uploadFile);

module.exports = router;
