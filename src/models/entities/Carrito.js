import { newId } from '../../utils/id.js'

export class Carrito {
  #id
  #productos
  #estado
  constructor({
    id = newId(),
    productos = [],
    estado = "pendiente"
  }) {
    this.#id = id
    this.#productos = productos
    this.#estado = estado
  }

  dto() {
    return {
      id: this.#id,
      productos: this.#productos,
      estado: this.#estado
    }
  }
}