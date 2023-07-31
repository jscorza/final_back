import { ErrorArgumentoInvalido } from '../models/errors/ArgumentoInvalido.error.js'
import { ErrorRecursoNoEncontrado } from '../models/errors/RecursoNoEncontrado.error.js'

export function apiErrorHandler(error, req, res, next) {
  if (error instanceof ErrorArgumentoInvalido) {
    res.status(400)
  } else if (error instanceof ErrorRecursoNoEncontrado) {
    res.status(404)
  } else {
    res.status(500)
  }
  res.json({ estado: 'error', tipo: error.tipo, descripcion: error.descripcion })
}

export function manejoDeErroresWeb(error, req, res, next) {
  if (error.message === 'AUTHENTICATION ERROR') {
    return res.redirect('/login')
  }

  if (error.message === 'AUTHORIZATION ERROR') {
    return res.redirect('/login')
  }

  if (error.message === 'NOT FOUND') {
    return res.status(404).send('<H1>No encontrado</H1>')
  }

  next(error)
}