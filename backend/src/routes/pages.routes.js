const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { savePage, getPages, deletePage, getCategories } = require('../controllers/pages.controller');

// All routes here are protected
router.post('/', protect, savePage);
router.get('/', protect, getPages);
router.get('/categories', protect, getCategories);
router.delete('/:id', protect, deletePage);

module.exports = router;