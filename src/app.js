const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

// Setup JSON Returns
app.use(express.json());

// Routers
app.use(userRouter);
app.use(taskRouter);

module.exports = app;