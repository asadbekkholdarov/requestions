const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Sizning schema faylingizni chaqirish
const FormData = require('./models/FormData');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Agar sizda 'public' papkasida HTML bo'lsa

// MongoDB connection
mongoose
  .connect(
    'mongodb+srv://507asadali_db_user:IiBsZE095b82B2QY@requestionscluster.o9mmnho.mongodb.net/?appName=requestionsCluster'
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// POST route to save 13 inputs
app.post('/submit', async (req, res) => {
  try {
    const data = new FormData(req.body);
    // Ma'lumotlarni saqlash
    await data.save();
    res.json({ message: 'Data Saved Successfully!' });
  } catch (err) {
    // Xatolik yuz berganda 500 status kodini qaytarish
    console.error("Ma'lumotlarni saqlashda xato:", err);
    res.status(500).json({ error: err.message || 'Server xatosi' });
  }
});

// GET route to fetch all data
// GET route to fetch all data, sorted by creation date (newest first)
app.get('/allData', (req, res) => {
  FormData.find()
    .sort({ createdAt: -1 }) // <-- BU YER ASOSIY O'ZGARTIRISH
    .then((data) => res.json(data))
    .catch((err) => {
      console.error("Ma'lumotlarni olishda xato:", err);
      res.status(500).json({ error: err.message || 'Server xatosi' });
    });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Server works!' });
});

// Start server
app.listen(4000, () => console.log('Server running on http://localhost:4000'));
