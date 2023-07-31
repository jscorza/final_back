export class ErrorArgumentoInvalido extends Error {
  constructor(descripcion) {
    super()
    this.tipo = 'argumento invalido'
    this.descripcion = descripcion
  }
}