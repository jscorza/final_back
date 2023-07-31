import { Usuario } from "../models/entities/Usuario.js";
import { usuariosRepository } from "../repositories/usuarios.repository.js";
import { criptografiador } from "../utils/criptografia.js";
import { emailService } from "./email.service.js";

class UsuariosService {
    constructor() { }
  
    async registrar(datosUsuario) {
        datosUsuario.password = criptografiador.hashear(datosUsuario.password)
        if (datosUsuario.email.includes("coder")) {
            console.log('recibi mail de admin')
          datosUsuario.rol = "admin";
        }
        datosUsuario.edad = parseInt(datosUsuario.edad)
        const usuario = new Usuario(datosUsuario)
        
        const creado = await usuariosRepository.create(usuario.dto())
       
      await emailService.send(creado.email, `te damos la bienvenida, ${creado.nombre}!`)
        
      
      return creado
    }
  
    async obtenerTodos() {
      return await usuariosManager.obtenerTodos()
    }
  }
  
  export const usuariosService = new UsuariosService()