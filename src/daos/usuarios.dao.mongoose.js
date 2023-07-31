import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const usuariosSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  email: String,
  password: String,
  rol: String,
  edad:Number,
  carritos: [{idCarrito: String, estado:String}],
}, { versionKey: false });

const usuariosModel = mongoose.model('usuarios', usuariosSchema)

class UsuariosDaoMongoose extends DaoMongoose {
  constructor(model) { super(model) }

  /* async readOnePopulated(criteria) {
    return await super.readOnePopulated(criteria, 'carritos', 'carritos', '_id');
  }

  async readManyPopulated(criteria) {
    return await super.readManyPopulated(criteria, 'carritos', 'carritos', '_id');
  } */
}


export const usuariosDaoMongoose = new UsuariosDaoMongoose(usuariosModel)