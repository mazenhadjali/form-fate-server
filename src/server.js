require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const schemaRoutes = require('./routes/schemaRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/schemas', schemaRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
