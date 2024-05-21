const express = require('express');
const mongoose = require('mongoose');
const ticketRoutes = require('./routes/ticket.route');
const analyticRoutes = require('./routes/analytics.route');

const app = express();
app.use(express.json());
app.use('/api/tickets',ticketRoutes);
app.use('/api/analytics/tickets',analyticRoutes)
mongoose.connect('mongodb://localhost:27017/TicketDataBase');

app.listen(3000, () => {
  console.log('Server started on port 3000');
});