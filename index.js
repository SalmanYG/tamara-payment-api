import express from 'express'
import mongoose from 'mongoose'

import paymentsRouter from './routes/payments.js'
import usersRouter from './routes/users.js'

import 'dotenv/config.js'

const app = express()
const PORT = 5000;

app.use(express.json())
app.use('/payments', paymentsRouter)
app.use('/users', usersRouter)

app.get('/', (req, res) => {
    res.send('HELLO from Homepage')
})

mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true},
    () => console.log('connected to DB')
)

app.listen(PORT)