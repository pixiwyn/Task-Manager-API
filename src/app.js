const express = require('express');
const cors = require('cors')
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

app.use(cors());

// Setup JSON Returns
app.use(express.json());

// Routers
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
