import { ticketsRepository } from '../repositories/tickets.repository.js'

export async function handleGet(req, res, next) {
  req.logger.http('entre al Get Tickets')
  try {
    if (req.params.id) {
      req.logger.verbose('recibi id: ' + req.params.id)
      const buscado = await ticketsRepository.readOne({ id: req.params.id })
      res.json(buscado)
    } else {
      req.logger.verbose('recibi query (busqueda): ' + JSON.stringify(req.query))

      const tickets = await ticketsRepository.readMany(req.query)
      res.json(tickets)
    }
  } catch (error) {
    req.logger.error('fallo get tickets. error: ' + error.message)
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  req.logger.http('entre al Get Tickets')
  try {
    const borrado = await ticketsRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) {
    req.logger.error('fallo delete tickets. error: ' + error.message)
    next(error)
  }
}