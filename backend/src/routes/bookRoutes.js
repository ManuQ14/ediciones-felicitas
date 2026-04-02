const express = require('express');
const router = express.Router();
const { getBooks, getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', getBooks);
router.get('/admin', verifyToken, getAllBooks);
router.get('/:id', getBookById);
router.post('/', verifyToken, createBook);
router.put('/:id', verifyToken, updateBook);
router.delete('/:id', verifyToken, deleteBook);

module.exports = router;
