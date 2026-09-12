require ('dotenv').config();


const Joi = require('joi');
const express = require('express');
const app = express();
const PORT = process.env.PORT
const DBconnect = require('./Database/DBconnect');
const errorHandler = require('./Middlewares/errorHandler');
const logRequest = require('./Middlewares/logger');

const blogRoutes = require('./Routes/Blog.route.js');
const UserRoutes = require('./Routes/User.route.js');


DBconnect()

app.use(express.json());
app.use(logRequest);
app.use('/api', blogRoutes);
app.use('/api/users', UserRoutes);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log (`Server is listening on PORT ${PORT}`)
});