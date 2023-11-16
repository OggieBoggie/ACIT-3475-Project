require('dotenv').config();
const fs = require('fs');
const express = require('express');
const router = express.Router();
const Image = require('../models/image');
const multer = require('multer');
const AWS = require('aws-sdk');
const upload = multer({ dest: 'uploads/' });

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

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

const handleFileAndBody = (req, res, next) => {
    if (!req.file && !req.body.url) {
        return res.status(400).json({ message: 'No file uploaded and no URL provided' });
    }
    next();
};

// Create one image
router.post('/', upload.single('file'), handleFileAndBody, async (req, res) => {
    let imageUrl;
    
    if (req.file) {
        const file = req.file;
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Body: fs.createReadStream(file.path),
            Key: `${Date.now()}_${file.originalname}`
        };

        try {
            const result = await s3.upload(uploadParams).promise();
            imageUrl = result.Location; 
        } catch (err) {
            return res.status(500).json({ message: 'Error uploading image' });
        } finally {
            fs.unlink(file.path, (err) => {
                if (err) console.error(`Failed to delete local file: ${err}`);
            });
        }
    } else {
        imageUrl = req.body.url;
    }

    try {
        const image = new Image({
            url: imageUrl,
            title: req.body.title,
            author: req.body.author,
            description: req.body.description || '',
        });

        const newImage = await image.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ message: 'Error saving image information' });
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