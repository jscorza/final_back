import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const ticketsSchema = new mongoose.Schema({
  id: String,
  purchaser: String,
  amount: Number,
  purchase_datetime: Date,
  
}, { versionKey: false })
const ticketsModel = mongoose.model('tickets', ticketsSchema)

export const ticketsDaoMongoose = new DaoMongoose(ticketsModel)