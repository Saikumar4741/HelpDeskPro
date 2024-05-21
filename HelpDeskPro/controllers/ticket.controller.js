
const Ticket = require('../models/ticket.model');

// GET /api/tickets
async function getTickets(req, res) {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// POST /api/tickets
async function createTicket(req, res) {
  const { id, title, description, status } = req.body;
  const ticket = new Ticket(req.body);
  try {
    const newTicket = await ticket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// GET /api/tickets/:id
async function getTicketById(req, res) {
  try {
    const ticket = await Ticket.findById(parseInt(req.params.id));
    if(!ticket){
      res.status(404).json({ message: 'Ticket Not Found' });
    }
    res.status(200).json(ticket);
    } 
    catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
      }
}

// PUT /api/tickets/:id
async function updateTicket(req, res) {
  const { status } = req.body;
  const ticketId = req.params.id; // Retrieve ticket ID from request parameters

  try {

    // Find the ticket by ID
    const ticket = await Ticket.findById(ticketId);

    // If ticket is not found, return error
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Update ticket properties if provided in request body
    currentTime=new Date()

    if (status) {
      ticket.status = status;
      ticket.resolutionTime=(currentTime-ticket.createdAt)/1000
    }

    // Save the updated ticket
    const updatedTicket = await ticket.save();
    
    // Return the updated ticket
    res.json(updatedTicket);
  } catch (err) {
    // Handle any errors that occur during the update process
    res.status(400).json({ message: err.message });
  }
}

// DELETE /api/tickets/:id
async function deleteTicket(req, res) {
  const ticketId = req.params.id;
  console.log('Deleting ticket:', ticketId);
  try {
    const ticket = await Ticket.findByIdAndDelete(ticketId);
    console.log('Found ticket:', ticket);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    console.log('Ticket deleted:', ticket);
    res.json({ message: 'Ticket deleted', ticket: ticket });
  } catch (err) {
    console.error('Error deleting ticket:', err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket
};