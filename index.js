import express from 'express'
import mongoose from 'mongoose'
import paymentsRouter from './routes/payments.js'
import usersRouter from './routes/users.js'
import 'dotenv/config.js'

mongoose.connect(
    process.env.DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const app = express()
app.use(express.json())
app.use('/payments', paymentsRouter)
app.use('/users', usersRouter)
app.get('/', (req, res) => {
    res.send(
        `You can access the users using '/users' route, where you can: 
        (GET, POST) -> '/', and (GET, DELETE) -> ':/id'.

        You can access the payments using '/payments' route, where you can: 
        (GET, POST) -> '/', and (GET, PATCH, DELETE) -> ':/id'.`)
})
app.listen(process.env.PORT)