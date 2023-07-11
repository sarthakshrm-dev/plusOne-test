const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
