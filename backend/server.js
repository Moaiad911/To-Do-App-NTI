const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const tasksRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/tasks', tasksRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
  });
})
.catch(err => console.error('❌ DB Connection Error:', err));

