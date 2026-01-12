const express = require('express');
const router = express.Router();

// Yeh Login ke liye hai
router.post('/login', (req, res) => {
    res.json({ message: "Login successful!" });
});

// Yeh Signup ke liye hai
router.post('/signup', (req, res) => {
    res.json({ message: "User registered!" });
});

module.exports = router;