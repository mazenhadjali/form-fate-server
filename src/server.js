require('dotenv').config();                      // Load .env vars :contentReference[oaicite:7]{index=7}
const express = require('express');              // Import Express :contentReference[oaicite:8]{index=8}
const mongoose = require('mongoose');            // Import Mongoose :contentReference[oaicite:9]{index=9}
const schemaRoutes = require('./routes/schemaRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/schemas', schemaRoutes);               // Mount routes

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
