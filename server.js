const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FormData = require('./models/FormData');

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(
    'mongodb+srv://507asadali_db_user:IiBsZE095b82B2QY@requestionscluster.o9mmnho.mongodb.net/?appName=requestionsCluster'
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// POST /submit
app.post('/submit', async (req, res) => {
  try {
    const data = new FormData(req.body);
    await data.save();
    res.json({ message: 'Data Saved Successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /allData
app.get('/allData', async (req, res) => {
  try {
    const data = await FormData.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/test', (req, res) => {
  res.json({ message: 'Server works!' });
});

// START SERVER — RENDER uchun kerak bo‘lgan qism
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
