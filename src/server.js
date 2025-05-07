require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const schemaRoutes = require('./routes/schemaRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// cors
// enable all origins for development purposes
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;


// Connect to MongoDB
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/schemas', schemaRoutes);
app.use('/users', userRoutes);

const PORT = process.env.APP_PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
