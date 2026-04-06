const express = require('express');
const router = express.Router();
const {
  getBooks, getAllBooks, getBookById, getBookBySlug,
  createBook, updateBook, deleteBook,
} = require('../controllers/bookController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', getBooks);
router.get('/admin', verifyToken, getAllBooks);
router.get('/slug/:slug', getBookBySlug);   // public — by slug
router.get('/:id', verifyToken, getBookById); // admin — by id
router.post('/', verifyToken, createBook);
router.put('/:id', verifyToken, updateBook);
router.delete('/:id', verifyToken, deleteBook);

module.exports = router;
