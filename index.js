const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv/config');

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/user');
const ncRoutes = require('./routes/canteen');
const itemRoutes = require('./routes/items');
const orderRoutes = require('./routes/orders');
const menuRoutes = require('./routes/menu');
const roleRoute = require('./routes/roles');

app.use('/user', userRoutes);
app.use('/canteen', ncRoutes);
app.use('/item', itemRoutes);
app.use('/order', orderRoutes);
app.use('/menu', menuRoutes);
app.use('/role', roleRoute);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
