const jwt = require('jsonwebtoken');

// @desc    Handle Google OAuth Callback
// @route   GET /api/auth/google/callback
const googleCallback = (req, res) => {
    // 1. User is already attached to req.user by Passport
    const user = req.user;

    // 2. Generate JWT Token
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );

    // 3. Redirect to Frontend with token
    // The frontend will grab this token from the URL and save it
    res.redirect(`${process.env.CLIENT_URL}/login-success?token=${token}`);
};

module.exports = { googleCallback };