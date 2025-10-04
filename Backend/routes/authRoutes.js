const express = require('express');
const router = express.Router();

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Get credentials from environment variables
    const validEmail = process.env.EMAIL_USER;
    const validPassword = process.env.EMAIL_PASS;

    // Validate credentials
    if (email === validEmail && password === validPassword) {
        res.json({
            success: true,
            message: 'Login successful'
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }
});

module.exports = router;