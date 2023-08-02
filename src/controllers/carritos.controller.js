import { Carrito } from '../models/entities/Carrito.js'
import { carritosRepository } from '../repositories/carritos.repository.js'
import { carritosService } from '../services/carritos.service.js';

export async function handleGet(req, res, next) {
  req.logger.http('entre get carritos')
  try {
    req.logger.verbose('recibi id: ' + req.params.id)
    const { id } = req.params;
    req.logger.verbose('recibi query: ' + JSON.stringify(req.query))
    const { populate } = req.query;

    const populateCarritos = !populate || populate.toLowerCase() !== 'false';
    const carritos = id
      ? await carritosRepository.readOne({ id }, { populateCarritos })
      : await carritosRepository.readMany({}, { populateCarritos });

    res.json(carritos);
  } catch (error) {
    req.logger.error('fallo get carritos. error: ' + error.message)
    next(error);
  }
}


export async function handlePost(req, res, next) {
  req.logger.http('entre post carritos')
  try {
    req.logger.verbose('recibi query: ' + JSON.stringify(req.body))
    const carrito = new Carrito(req.body)
    const creado = await carritosRepository.create(carrito.dto())
    res.status(201).json(creado)
  } catch (error) {
    req.logger.error('fallo post carritos. error: ' + error.message)
    next(error)
  }
}

export async function handlePut(req, res, next) {
  req.logger.http('entre put carritos')
    try {
    req.logger.verbose('recibi query: ' + JSON.stringify(req.body))
    const actualizado = await carritosRepository.updateOne(req.params.id, req.body)
    res.json(actualizado)
  } catch (error) {
    req.logger.error('fallo put carritos. error: ' + error.message)
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  req.logger.http('entre Delete carritos')
  try {
    req.logger.verbose('recibi id: ' + req.params.id)
    const borrado = await carritosRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) {
    req.logger.error('fallo delete carritos     . error: ' + error.message)
    next(error)
  }
}

export async function handlePutAgregarProducto(req, res, next){
  try {
    req.logger.http('entre al PutAgregarProducto    (carritos.controller)')
    const { id } = req.params
    const usuario = req.usuario
    req.logger.verbose(`recibi id: ${req.params.id} \n para el carrito del usuario logueado: ${JSON.stringify(req.usuario)} \n`)
    const agregado = await carritosService.agregarProducto(id,usuario.id)
    next()
  } catch (error) {
    req.logger.error('fallo PutAgregarProducto     (carritos.controller) . error: ' + error.message)
    next(error)
  }
  


}

export async function handlePutEliminarProducto(req, res, next){
  req.logger.http('entre al PutEliminarProducto   (carritos.controller)')
  try {

    const { id } = req.params
    const usuario = req.usuario
    req.logger.verbose('recibi id: ' + req.params.id + 'usuario: '+ JSON.stringify(req.usuario))
    const agregado = await carritosService.eliminarProducto(id,usuario.id)
    next()
  } catch (error) {
    req.logger.error('fallo PutEliminarProducto  (carritos.controller). error: ' + error.message)
    next(error)
  }
  

}

export async function handlePutCompra(req, res, next){
  req.logger.http('entre al PutCompra')
  try {
    const usuario = req.usuario
    req.logger.verbose('usuario que realiza la compra: '+ JSON.stringify(req.usuario))
    const compra = await carritosService.compra(usuario.id)
    req.logger.verbose('ticket creado de la compra: '+ JSON.stringify(compra))

    next()
  } catch (error) {
    req.logger.error('fallo PutCompra. error: ' + error.message)
    next(error)
    
  }
  

}



