import { Router } from 'express'

import { ticketsRouter } from './tickets.router.js'
import { usuariosRouter } from './usuarios.router.js'
import { carritosRouter } from './carritos.router.js'
import { productosRouter } from './productos.router.js'
import { sesionesRouter } from './sesiones.router.js'
import { extraerCredenciales } from '../../middlewares/auth.js'
import { apiErrorHandler } from '../../middlewares/manejoDeErrores.js'
import { docsRouter } from './documentacion.router.js'

export const apiRouter = Router()

apiRouter.use((req, res, next) => {
  console.log(`(${req.method}) ${req.url}`)
  next()
})

apiRouter.use('/docs', docsRouter)

apiRouter.use('/productos',extraerCredenciales, productosRouter)
apiRouter.use('/carritos',extraerCredenciales, carritosRouter)
apiRouter.use('/usuarios',extraerCredenciales, usuariosRouter)
apiRouter.use('/tickets', ticketsRouter)
apiRouter.use('/sesiones', sesionesRouter)

apiRouter.use(apiErrorHandler)
