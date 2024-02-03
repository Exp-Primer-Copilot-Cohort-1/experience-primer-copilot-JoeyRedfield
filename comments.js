// Create web server
// This file is used to create a web server using the express module
// It also contains the logic to handle the GET and POST requests
// for the comments page

// Import the express module
const express = require('express');
const router = express.Router();
// Import the data module
const data = require('../data');
// Import the comments data module
const commentsData = data.comments;

// GET request for the comments page
router.get('/:id', async (req, res) => {
    try {
        // Get the comments for the specified recipe
        const comments = await commentsData.getCommentsByRecipeId(req.params.id);
        // Send the comments to the client
        res.json(comments);
    } catch (e) {
        // If there is an error, send a 500 status code and an error message
        res.status(500).json({ error: e });
    }
});

// POST request for the comments page
router.post('/:id', async (req, res) => {
    // Get the data from the request
    let commentData = req.body;
    // If the data is not valid, send a 400 status code and an error message
    if (!commentData) {
        res.status(400).json({ error: 'You must provide data to create a comment' });
        return;
    }
    // If the data is not valid, send a 400 status code and an error message
    if (!commentData.poster) {
        res.status(400).json({ error: 'You must provide a poster for the comment' });
        return;
    }
    // If the data is not valid, send a 400 status code and an error message
    if (!commentData.comment) {
        res.status(400).json({ error: 'You must provide a comment' });
        return;
    }
    // If the data is not valid, send a 400 status code and an error message
    if (typeof commentData.poster !== 'string') {
        res.status(400).json({ error: 'The poster must be a string' });
        return;
    }
    // If the data is not valid, send a 400 status code and an error message
    if (typeof commentData.comment !== 'string') {
        res.status(400).json({ error: 'The comment must be a string' });
        return;
    }
    try {
        // Create a new comment
        const newComment = await commentsData.addComment(req.params.id, commentData.poster, commentData.comment);
        // Send the new comment to the client
        res.json(newComment);
    } catch (e) {
        // If there is an error, send a 500 status code and an error message
        res.status(500).json({ error: e });
    }
});
