// import express from 'express';
// import songsRoutes from './routes/song.routes'
const express = require('express');
const songsRoutes = require("./routes/song.routes");
const cors = require('cors')


const app = express();
app.use(cors());
app.use(express.json());

app.use('/', songsRoutes);


module.exports = app;