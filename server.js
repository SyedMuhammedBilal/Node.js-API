const config   = require('config');
const Joi      = require('@hapi/joi');
Joi.objectId   = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users    = require('./routes/users');
const auth     = require('./routes/auth');
const express  = require('express');
const app      = express();

if (!config.get('PrivateKey')) {
	console.error('FATAL ERROR: PrivateKey is not defined');
	process.exit(1);
}

mongoose.connect('mongodb+srv://syed_bilal:1234@cluster0-aypln.mongodb.net/test?retryWrites=true&w=majority')
	.then(() => console.log('Connected to MongoDB!'))
	.catch(err => console.log('Something went wrong', err));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}...`));