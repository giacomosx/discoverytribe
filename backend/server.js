require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();
const PORT = process.env.PORT || 3030;
const dbName = 'social-trip-v1'

const userRoutes = require('./routes/user');

server.use(cors());
server.use(express.json());

server.use('/api/v1/user', userRoutes);


const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI + dbName);
        await console.log('MongoDB Connected!');

        server.listen(PORT, () => {
                console.log(`Server listening on port ${PORT}`);
            }
        )
    } catch (e) {
        console.error(e);
    }
}

startServer();