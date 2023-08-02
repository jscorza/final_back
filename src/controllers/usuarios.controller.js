import { usuariosRepository } from '../repositories/usuarios.repository.js'
import { usuariosService } from '../services/usuarios.service.js'
import { criptografiador } from '../utils/criptografia.js'

export async function handleGet(req, res, next) {
  req.logger.http('entre al Get usuarios ')
  try {
    let Uid ; 
    if(req.params.id){
      Uid = req.params.id
    }
    if (Uid) {
      req.logger.verbose('recibi id: ' + req.params.id)
    
      const buscado = await usuariosRepository.readOne({ _id: Uid })
      
      res.json(buscado)
    } else {
      req.logger.verbose('recibi query (busqueda): ' + JSON.stringify(req.query))
      const usuarios = await usuariosRepository.readMany(req.query)
      res.json(usuarios)
    }
  } catch (error) {
    req.logger.error('fallo get usuarios. error: ' + error.message)
    next(error)
  }
}

export async function handlePost(req, res, next) {
  req.logger.http('entre al POST usuarios ')
  try {
    
    req.logger.verbose('recibi body: ' + JSON.stringify(req.body))
    const creado = await usuariosService.registrar(req.body)
    const token = criptografiador.generarToken(creado)
    res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })
    
    res.status(201).json(creado)
  } catch (error) {
    req.logger.error('fallo POST usuarios. error: ' + error.message)
    next(error)
  }
}



export async function handlePut(req, res, next) {
  req.logger.http('entre al Put usuarios ')
  try {
    req.logger.verbose('recibi id: ' + req.params.id)
    req.logger.verbose('recibi body: ' + JSON.stringify(req.body))
    const actualizado = await usuariosRepository.updateOne(req.params.id, req.body)
    res.json(actualizado)
  } catch (error) {
    req.logger.error('fallo PUT usuarios. error: ' + error.message)
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  req.logger.http('entre al DELETE usuarios ')
  try {
    req.logger.verbose('recibi id: ' + req.params.id)
    const borrado = await usuariosRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) {
    req.logger.error('fallo Delete usuarios. error: ' + error.message)
    next(error)
  }
}

export async function handleGetLog(req, res, next) {
  req.logger.http('entre al GET usuario Logueado ')
  try {
    req.logger.verbose('usuario logueado: ' + JSON.stringify(req.usuario))
    res.json(req.usuario)
  } catch (error) {
    req.logger.error('fallo GET del logueado usuarios. error: ' + error.message)
    next(error)
  }
}
export async function handlePutCarrito (req, res, next){
  req.logger.http('entre al Put usuario que agrega/modifica el carrito del usuario')

  try {
    
    req.logger.verbose('recibi body: ' + JSON.stringify(req.body))
    const {idCarrito} = req.body;
    const {idUsuario} = req.body
    const actualizado = await usuariosService.addCartToUser(idUsuario, idCarrito);

    res.json(actualizado).status(200);
  } catch (error) {
    req.logger.error('fallo Put (que agrega/modifica carrito del user) usuarios. error: ' + error.message)
    next(error);
  }

}
export async function handleDeleteInactivos (req, res, next){
  req.logger.http('entre al Delete de inactivos')
  try {
    const borrados = await usuariosService.borrarInactivos()
    req.logger.verbose('borrados: ' + JSON.stringify(borrados))
    res.json(borrados).status(200)
  } catch (error) {
    req.logger.error('fallo DeleteInactivos error: ' + error.message)
    next(error);
  }
  

}