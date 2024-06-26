const express = require('express');
const router = express.Router();
const {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket
} = require('../controllers/ticket.controller');

// GET /api/tickets
router.get('/', getTickets);

// POST /api/tickets 
router.post('/', createTicket);

// GET /api/tickets/:id
router.get('/:id', getTicketById);

// PUT /api/tickets/:id
router.put('/:id', updateTicket);

// DELETE /api/tickets/:id
router.delete('/:id', deleteTicket);

module.exports = router;