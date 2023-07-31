export class ErrorRecursoNoEncontrado extends Error {
  constructor(descripcion) {
    super()
    this.tipo = 'recurso no encontrado'
    this.descripcion = descripcion
  }
}