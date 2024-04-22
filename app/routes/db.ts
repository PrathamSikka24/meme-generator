// db.js

import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/memedb', {
}).then(() => console.log('MongoDB chal raha h'))
  .catch(err => console.error('MongoDB connection error:', err));
