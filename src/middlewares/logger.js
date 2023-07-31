import { winstonLogger } from '../utils/logger.js'

export const logger = (req, res, next) => {
    req.logger = winstonLogger
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}
