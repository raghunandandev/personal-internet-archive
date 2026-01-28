const Page = require('../models/page.model');

// @desc    Save a new page
// @route   POST /api/pages
// @access  Private
const savePage = async (req, res) => {
    try {
        const { url, title, screenshot, textContent, htmlContent, category } = req.body;

        if (!url || !title) {
            return res.status(400).json({ message: 'URL and Title are required' });
        }

        const page = await Page.create({
            userId: req.userId, // Comes from auth middleware
            url,
            title,
            screenshot, // Base64 string
            textContent,
            htmlContent,
            tags: [],
            notes: '',
            category: category || 'General'
        });

        res.status(201).json(page);
    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all pages (with search support)
// @route   GET /api/pages
// @access  Private
const getPages = async (req, res) => {
    try {
        const { search } = req.query;

        // 1. Base query: Only get pages for THIS user
        let query = { userId: req.userId };

        // 2. If search term exists, use MongoDB Text Search
        if (search) {
            query.$text = { $search: search };
        }

        // 3. Execute query (Sort by newest first)
        const pages = await Page.find(query).sort({ savedAt: -1 });

        res.json(pages);
    } catch (error) {
        console.error("Get Pages Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a page
// @route   DELETE /api/pages/:id
// @access  Private
const deletePage = async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);

        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        // Security Check: Ensure user owns this page
        if (page.userId.toString() !== req.userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await page.deleteOne();
        res.json({ message: 'Page removed' });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getCategories = async (req, res) => {
    try {
        // MongoDB 'distinct' finds all unique values for this field
        const categories = await Page.distinct('category', { userId: req.userId });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = { savePage, getPages, deletePage, getCategories };