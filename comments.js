// Create web server
// Create a new comment
// Get all comments
// Get a comment by id
// Update a comment by id
// Delete a comment by id

const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Create a new comment
router.post('/comments', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all comments
router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a comment by id
router.get('/comments/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    res.status(200).send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a comment by id
router.patch('/comments/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    res.status(200).send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a comment by id
router.delete('/comments/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    res.status(200).send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;