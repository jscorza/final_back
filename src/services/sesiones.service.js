import { criptografiador } from "../utils/criptografia.js"
import { usuariosRepository } from "../repositories/usuarios.repository.js"
class SesionesService{

    async loginUser(credenciales){

        try {
            const usuario = await usuariosRepository.readOne({email: credenciales.email})
            if(!usuario){
                return new Error('AUTHENTICATION ERROR')
            }
            if (!criptografiador.comparar(credenciales.password, usuario.password)) {
                return new Error('AUTHENTICATION ERROR')
            }

            const token = criptografiador.generarToken(usuario)
            usuario.ultimaConexion = Date.now()
            await usuariosRepository.updateOne({email: credenciales.email},{ ultimaConexion: Date.now() })
            
            
            return token

            
        } catch (error) {
            throw new Error("fallo el login de user")
        }

    }

    

}
export const sesionesService = new SesionesService;