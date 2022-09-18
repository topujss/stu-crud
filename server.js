/** student data with express js by using json db
 * Video: MERN 8-31-22 https://youtu.be/IcE-JSCbRVY
 * Video p2: MERN 8-31-22 https://youtu.be/oYUGSARzZ88
 * Video: MERN 9-05-22 https://youtu.be/Co9kG6jFx4c
 * Video: MERN 9-05-22 https://youtu.be/YG5s7oV0BCQ 48:07 / 1:00:07 << start from this;
 * Learned: student data, create, add to json, read,
 *> Note start:
 * (slash)/ => means in public
 * in router id should be at the bottom
 * arr.find => get one data from many
 * arr.filter => get all data from every data
 * https://ionic.io/ionicons /> for icons
 */
// init needy
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const studentRoute = require('./routes/studentRoute');
const expLyts = require('express-ejs-layouts');

// env setup
dotenv.config();
const PORT = process.env.SERVER_PORT || 6000;

// express function
const app = express();

// form setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// template engine
app.use(expLyts);
app.set('view engine', 'ejs');
app.set('layout', 'layouts/app');

// create server
app.listen(PORT, (req, res) => console.log(`express is running on port ${PORT}`.bgGreen.red));

// static folder
app.use(express.static('public'));

// route
app.use('/student', studentRoute);
