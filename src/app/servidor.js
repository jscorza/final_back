import express from 'express'
import { engine } from 'express-handlebars'
import { apiRouter } from '../routers/api/api.router.js'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import { COOKIE_SECRET } from '../config/auth.config.js'
import { vistasRouter } from '../routers/vistas.router.js'
import { PORT } from '../config/server.config.js'
import { conectar } from '../database/mongoose.js'
import { logger } from '../middlewares/logger.js'

await conectar()

const app = express()
const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en puerto ${PORT}`)
})

const io = new Server(server)

io.on('connection', async socket => {
    console.log('cliente nuevo conectado')
})

app.use(cookieParser(COOKIE_SECRET))

app.use((req, res, next) => {
    req['io'] = io
    next()
})

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))
app.use(express.json())
app.use(logger)

app.use('/api', apiRouter) 
app.use('/', vistasRouter)
