import { usuariosDaoMongoose } from '../daos/usuarios.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'
class UsuariosRepository extends GenericRepository{
    constructor(dao){super(dao)} 

    /* async readOne(criteria, { populatecarritos } = { populatecarritos: true }) {
    
        if (populatecarritos !== false) {
          
          return await this.dao.readOnePopulated(criteria);
        } else {
          
          return await this.dao.readOne(criteria);
        }
      }
    
      async readMany(criteria, { populatecarritos } = { populatecarritos: true }) {
        if (populatecarritos !== false) {
          
          return await this.dao.readManyPopulated(criteria);
        } else {
          
          return await this.dao.readMany(criteria);
        }
      } */

}

export const usuariosRepository = new UsuariosRepository(usuariosDaoMongoose)