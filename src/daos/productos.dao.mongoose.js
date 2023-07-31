import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const productosSchema = new mongoose.Schema({
  id: String , 
  title: String , 
  description: String , 
  code: String , 
  price: Number , 
  stock: Number , 
  category: String , 
  thumbnail: [String], 
  status: String , 
  
  
}, { versionKey: false })
const productosModel = mongoose.model('productos', productosSchema)

export const productosDaoMongoose = new DaoMongoose(productosModel)