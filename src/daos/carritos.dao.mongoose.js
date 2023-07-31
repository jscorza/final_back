import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const carritosSchema = new mongoose.Schema({
  id: String,
  productos: [{
    producto: String,
    quantity: Number
  }],
  estado: String
}, {
  versionKey: false
})

const carritosModel = mongoose.model('carritos', carritosSchema)

class CarritosDaoMongoose extends DaoMongoose {
  constructor(model) {
    super(model);
  }
/* 
  async readOnePopulated(criteria) {
    return await this.model.findOne(criteria).populate('productos.producto').exec();
  }

  async readManyPopulated(criteria) {
    return await this.model.find(criteria).populate('productos.producto').exec();
  } */
}


export const carritosDaoMongoose = new CarritosDaoMongoose(carritosModel)
