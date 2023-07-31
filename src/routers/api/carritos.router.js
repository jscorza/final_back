import { Router } from 'express'

import * as carritosController from '../../controllers/carritos.controller.js'

export const carritosRouter = Router()

carritosRouter.get('/:id?', carritosController.handleGet)
carritosRouter.post('/', carritosController.handlePost)
carritosRouter.put('/:id?', carritosController.handlePut)
carritosRouter.post('/comprar/carrito', carritosController.handlePutCompra)
carritosRouter.put('/agregar-producto/:id', carritosController.handlePutAgregarProducto)
carritosRouter.put('/eliminar-producto/:id', carritosController.handlePutEliminarProducto)
carritosRouter.delete('/:id', carritosController.handleDelete)
