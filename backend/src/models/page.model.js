const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Optimize queries by user
    },
    url: { type: String, required: true },
    title: { type: String },
    screenshot: { type: String }, // Stored as Base64 data URI
    textContent: { type: String }, // Clean text for searching
    htmlContent: { type: String }, // Raw HTML (optional, can be large)
    category: { type: String, default: 'General', index: true },
    tags: [{ type: String }],
    notes: { type: String },
    savedAt: { type: Date, default: Date.now }
});

// Create Text Index for Search Functionality
PageSchema.index({
    title: 'text',
    textContent: 'text',
    category: 'text',
    notes: 'text',
    tags: 'text'
});

module.exports = mongoose.model('Page', PageSchema);