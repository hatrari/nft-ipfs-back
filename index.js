require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

const pinataRoutes = require('./routes/pinata');
app.use('/', pinataRoutes);

app.listen(process.env.PORT,
	() => console.log(`server started at ${process.env.PORT}`)
);
