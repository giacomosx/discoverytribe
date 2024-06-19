require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const tripRoutes = require('./routes/trip');
const feedRoutes = require('./routes/feed');
const milestoneRoutes = require('./routes/milestone');
const geoApiRoutes = require('./routes/geoapify');
const auth = require('./middlewares/tokenController');
const errorHandler = require('./middlewares/errorHandlers');

const server = express();
const PORT = process.env.PORT || 5000;

server.use(cors());
server.use(express.json());


server.use('/api/v1/auth', authRoutes);

server.use(auth.verifyToken);

server.use('/api/v1/feed', feedRoutes);
server.use('/api/v1/user', userRoutes);
server.use('/api/v1/posts', postRoutes );
server.use('/api/v1/trips', tripRoutes);
server.use('/api/v1/milestones', milestoneRoutes);
server.use('/api/v1/geoapi', geoApiRoutes);

server.use(errorHandler.genericErr)
server.use(errorHandler.notFoundErr)


const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI + process.env.DB_NAME);
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