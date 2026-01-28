const express = require('express');
const passport = require('passport');
const { googleCallback } = require('../controllers/auth.controller');

const router = express.Router();

// @route   GET /api/auth/google
// @desc    Start Google Login
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @route   GET /api/auth/google/callback
// @desc    Google redirects back here
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    googleCallback
);

module.exports = router;