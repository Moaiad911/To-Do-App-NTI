const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/tododb'; // use MongoDB Atlas URI if cloud

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', todoRoutes);

// Connect and start
mongoose.connect(MONGO_URI)
  .then(() => {
    app.get('/', (req, res) => {
    res.send('Welcome to the To-Do API 👋');
    });

    app.listen(PORT, () => {
      console.log(`✅ Server running: http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB error:', err));
