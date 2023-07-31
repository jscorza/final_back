import { Router } from 'express'
import { crearProductosMock } from '../../mocks/productos.Mock.js'

export const testRouter = Router()

testRouter.use("/mockingproducts/:n?",mockingProducts)
testRouter.use('/loggerTesting',testingLogger)

async function mockingProducts(req, res , next){
    if(req.params.n){
        res.json(crearProductosMock(n))

    }else{
        res.json(crearProductosMock(50))
    }
}

async function testingLogger(error,req,res,next){

req.logger.http('entre al Get usuarios ')

req.logger.verbose('recibi id: ' + req.params.id)

req.logger.verbose('recibi query (busqueda): ' + JSON.stringify(req.query))

req.logger.error('fallo get usuarios. error: ' + error.message)

req.logger.http('entre al POST usuarios ')

req.logger.verbose('recibi body: ' + JSON.stringify(req.body))

req.logger.verbose('recibi mail de admin')

req.logger.error('fallo POST usuarios. error: ' + error.message)

req.logger.http('entre al Put usuarios ')

req.logger.verbose('recibi id: ' + req.params.id)

req.logger.verbose('recibi body: ' + JSON.stringify(req.body))

req.logger.error('fallo PUT usuarios. error: ' + error.message)

req.logger.http('entre al DELETE usuarios ')

req.logger.verbose('recibi id: ' + req.params.id)

req.logger.error('fallo Delete usuarios. error: ' + error.message)

req.logger.http('entre al GET usuario Logueado ')

req.logger.verbose('usuario logueado: ' + JSON.stringify(req.usuario))

req.logger.error('fallo GET del logueado usuarios. error: ' + error.message)

req.logger.http('entre al Put usuario que agrega/modifica el carrito del usuario')
req.logger.verbose('recibi body: ' + JSON.stringify(req.body))

req.logger.error('fallo Put (que agrega/modifica carrito del user) usuarios. error: ' + error.message)
res.json("EL LOGGER SE EJECUTO")
next()
}