import { Router } from 'express'
import { postSesionesController, deleteSesionesController } from '../../controllers/sesiones.controller.js'

export const sesionesRouter = Router()

sesionesRouter.post('/', postSesionesController)
sesionesRouter.delete('/', deleteSesionesController)
