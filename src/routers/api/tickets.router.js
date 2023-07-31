import { Router } from 'express'

import * as ticketsController from '../../controllers/tickets.controller.js'

export const ticketsRouter = Router()

ticketsRouter.get('/:id?', ticketsController.handleGet)
/* ticketsRouter.post('/', ticketsController.handlePost)
ticketsRouter.put('/:id', ticketsController.handlePut) */
ticketsRouter.delete('/:id', ticketsController.handleDelete)
