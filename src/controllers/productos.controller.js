import { Producto } from '../models/entities/Producto.js'
import { productosRepository } from '../repositories/productos.repository.js'

export async function handleGet(req, res, next) {
  req.logger.http('entre al Get productos')
  try {
    if (req.params.id) {
      req.logger.verbose('recibi id: ' + req.params.id)
      const buscado = await productosRepository.readOne({ id: req.params.id })
      res.json(buscado)
    } else {
      const productos = await productosRepository.readMany(req.query)
      res.json(productos)
    }
  } catch (error) {
    req.logger.error('fallo get productos. error: ' + error.message)
    next(error)
  }
}

export async function handlePost(req, res, next) {
  req.logger.http('entre al Post productos')
  try {
    req.logger.verbose('recibi body: ' + JSON.stringify(req.body))
    const producto = new Producto(req.body)
    const creado = await productosRepository.create(producto.dto())
    res.status(201).json(creado)
  } catch (error) {
    req.logger.error('fallo post productos. error: ' + error.message)
    next(error)
  }
}

export async function handlePut(req, res, next) {
  req.logger.http('entre al Put productos')
  try {
    req.logger.verbose('recibi id: ' + req.params.id)
    req.logger.verbose('recibi body: ' + JSON.stringify(req.body))

    const actualizado = await productosRepository.updateOne(req.params.id, req.body)
    res.json(actualizado)
  } catch (error) {
    req.logger.error('fallo put productos. error: ' + error.message)
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  req.logger.http('entre al Delete productos')


  try {
    req.logger.verbose('recibi id: ' + req.params.id)
    const borrado = await productosRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) {
    req.logger.error('fallo delete productos. error: ' + error.message)
    next(error)
  }
}

export async function handlePutRestock(req, res, next) {
  try {
    
    const productosConStockMenor10 = await productosRepository.readMany({ stock: { $lt: 10 } });

    
    for (const producto of productosConStockMenor10) {
      
      await productosRepository.updateOne({ id: producto.id }, {stock:10});
    }

    res.status(200).json({ message: "Restock realizado correctamente." });
  } catch (error) {
    next(error);
  }
}