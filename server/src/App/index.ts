import express, { Express, NextFunction, Request, Response } from 'express'
import 'express-async-errors'
// import routes from './routes'

import dotenv from 'dotenv'
// import { routes } from '../routes'
import cors from 'cors'
import { personRoutes } from '../routes/personRoutes'
import { collaboratorRoutes } from '../routes/colaboratorRoutes'
import { catRoute } from '../routes/catRoute'
const app: Express = express()
dotenv.config()


app.use(
    cors(),
)

app.use(express.json({ limit: '20mb' }))
app.use('/person', personRoutes)
app.use('/collaborator', collaboratorRoutes)
app.use('/http/cat', catRoute)

app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
        console.log(error)
        return response.status(500).json({
            status: 'Error',
            message: 'Internal error',
        })
    },
)

export {
    app
}