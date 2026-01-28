const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { savePage, getPages, deletePage, getCategories, updatePage, getPageById } = require('../controllers/pages.controller');

// All routes here are protected
router.post('/', protect, savePage);
router.get('/', protect, getPages);
router.get('/categories', protect, getCategories);
router.put('/:id', protect, updatePage);
router.get('/:id', protect, getPageById);
router.delete('/:id', protect, deletePage);

module.exports = router;