import { sesionesService } from '../services/sesiones.service.js'

export async function postSesionesController(req, res, next) {
    req.logger.http('entre al Post Sesiones')
    const credenciales = req.body
    req.logger.verbose('recibi body (credenciales para login(no guardamos ningun dato de estos)): ' + JSON.stringify(req.body))
    

    try {
        const token = await sesionesService.loginUser(credenciales)
        
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
