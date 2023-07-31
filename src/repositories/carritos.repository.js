import { carritosDaoMongoose } from '../daos/carritos.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

class CarritosRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  /* async readOne(criteria, { populateProductos } = { populateProductos: true }) {
    
    if (populateProductos !== false) {
      return await this.dao.readOnePopulated(criteria);
    } else {
      return await this.dao.readOne(criteria);
    }
  }

  async readMany(criteria, { populateProductos } = { populateProductos: true }) {
    if (populateProductos !== false) {
      return await this.dao.readManyPopulated(criteria);
    } else {

      return await this.dao.readMany(criteria);
    }
  } */
}


export const carritosRepository = new CarritosRepository(carritosDaoMongoose)