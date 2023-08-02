import { Router } from 'express'
import { extraerCredenciales, soloAdmin, soloAutenticados } from '../middlewares/auth.js'
import { renderProducts, renderRestock } from '../renders/productos.render.js'
import { renderCarrito } from '../renders/carrito.render.js'
import { renderUsuarios } from '../renders/usuarios.render.js'

export const vistasRouter = Router()

vistasRouter.get('/', (req, res, next) => {
    res.redirect('/productos')
})

vistasRouter.get('/productos', extraerCredenciales, soloAutenticados,renderProducts )

vistasRouter.get('/carrito', extraerCredenciales, soloAutenticados,renderCarrito)

vistasRouter.get('/usuarios', extraerCredenciales,soloAdmin,renderUsuarios)

vistasRouter.get('/restock', extraerCredenciales,soloAdmin,renderRestock)

vistasRouter.get('/register', async (req, res, next) => {
    res.render('register', {
        pageTitle: 'Registro de usuarios',
    })
})


vistasRouter.get('/login', async (req, res, next) => {
    res.render('login', {
        pageTitle: 'Login'
    })
})

vistasRouter.use((error, req, res, next) => {
    if (error.message === 'AUTHORIZATION ERROR') {
        return res.send('No tenes permiso para acceder a este recurso. Intenta <a href="/login">loguearte</a> con un usuario con los permisos adecuados.')
    }
    next(error)
})