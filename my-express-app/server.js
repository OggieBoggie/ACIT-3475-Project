require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to DB'))

// Middleware
app.use(cors())
app.use(helmet())   
app.use(express.json())

// Routes here

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// Start the server
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT} 🚀`));