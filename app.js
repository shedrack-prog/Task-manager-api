const express = require('express');
const taskRoute = require('./routes/taskRoute');
const connectDB = require('./db/connect');

const notFoundMiddleware = require('./middleware/not-found');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// middleware--------------
app.use(express.json());

// Routes
app.use('/api/v1/tasks', taskRoute);
app.use(notFoundMiddleware);
// app.get('/', (req, res) => res.send('welcome to port 5000'));

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`app listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
