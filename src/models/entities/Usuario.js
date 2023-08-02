import { newId } from '../../utils/id.js'
import { obligatorio, validarEdad, validarEmail, validarNombre, validarPassword, validarRol } from '../validations/validaciones.js'

export class Usuario {
  #id
  #nombre
  #email
  #edad
  #password
  #rol
  #carritos
  #ultimaConexion
  constructor({
    id = newId(),
    nombre,
    email,
    password,
    rol = 'user',
    carritos = [],
    edad,
    ultimaConexion = Date.now(),
  }) {
    this.#id = id

    obligatorio(nombre)
    this.#nombre = validarNombre(nombre)

    obligatorio(email)
    this.#email = validarEmail(email)
 
    obligatorio(password)
    this.#password = validarPassword(password),

    obligatorio(rol)
    this.#rol = validarRol(rol)
    
    obligatorio(edad)
    this.#edad = validarEdad(edad)
    
    
    this.#carritos = carritos

    this.#ultimaConexion = ultimaConexion
  }

  

  dto() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      password: this.#password,
      email: this.#email,
      rol: this.#rol,
      carritos: this.#carritos,
      ultimaConexion: this.#ultimaConexion
    }
  }
}