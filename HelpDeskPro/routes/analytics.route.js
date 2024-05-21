const express = require('express');
const router = express.Router();
const ticketModel=require('../models/ticket.model')
router.get('/',async (req,res)=>{
    try{
        const totalTickets=await ticketModel.countDocuments()
        const tickets=await ticketModel.find({status:"Closed"})
        const totalResponseTime=tickets.reduce((acc,ticket)=>acc+ticket.resolutionTime,0)
        const averageResponseTime=totalResponseTime/tickets.length
        const resolvedTickets=tickets.length
        res.json({totalTickets,resolvedTickets,averageResponseTime})
    }
    catch(error){
        res.json({message:error.message})
    }
})
module.exports=router