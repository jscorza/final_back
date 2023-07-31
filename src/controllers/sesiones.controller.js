import { usuariosRepository } from '../repositories/usuarios.repository.js'
import { criptografiador } from '../utils/criptografia.js'

export async function postSesionesController(req, res, next) {
    req.logger.http('entre al Post Sesiones')
    const credenciales = req.body
    req.logger.verbose('recibi body (credenciales): ' + JSON.stringify(req.body))
    

    try {
        
        const usuario = await usuariosRepository.readOne({email: credenciales.email})
        
        if (!criptografiador.comparar(credenciales.password, usuario.password)) {
            return next(new Error('AUTHENTICATION ERROR'))
        }

        const token = criptografiador.generarToken(usuario)
        res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })

        res.sendStatus(201)

    } catch (error) {
        req.logger.error('fallo Post sessiones. error: ' + error.message)
        next(new Error('AUTHENTICATION ERROR'))
    }
}

export async function deleteSesionesController(req, res, next) {
    req.logger.http('entre al DELETE Sesiones')
    try {
        res.clearCookie('authToken', { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })
        res.sendStatus(204)
    } catch (error) {
        req.logger.error('fallo DELETE sessiones. error: ' + error.message)
        next(error)
        
    }
}
