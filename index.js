require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const userRoute = require('./routes/user');

const app = express();

mongoose.connect(process.env.MONGO_URI, () => {
    console.log('connection to mongoDB successful');
});

app.use(express.json());

app.use('/api/v1/user', userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server listening at PORT ${PORT}`);
});