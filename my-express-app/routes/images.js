const express = require('express');
const router = express.Router();
const Image = require('../models/image');

// Get all images
router.get('/', async (req, res) => {
    try {
        const image = await Image.find();
        res.json(image);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one image
router.get('/:id', getImage, (req, res) => {
    res.json(res.image);
});

// Create one image
router.post('/', async (req, res) => {
    const image = new Image({
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description || '',
        date: req.body.date,
    })
    try {
        const newImage = await image.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one image
router.delete('/:id', async (req, res) => {
    try {
        const result = await Image.findByIdAndDelete(req.params.id);
        if (result == null) {
            return res.status(404).json({ message: 'Cannot find image' });
        }
        res.json({ message: 'Deleted image' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getImage(req, res, next) {
    let image;

    try {
        image = await Image.findById(req.params.id);
        if (image == null) {
            return res.status(404).json({ message: 'Cannot find image' });
        } 
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal Error' });
    }
    res.image = image;
    next();
}

module.exports = router;