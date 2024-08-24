const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5174', // Your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

module.exports = cors(corsOptions);
