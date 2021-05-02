import User from '../models/user.js'
import Payment from '../models/payment.js'
import axios from 'axios'

const STATUS = {
    PAID: "paid",
    UNPAID: "unpaid",
    OVERDUE: "overdue",
    CANCELLED: "cancelled"
}

export const getPayments = async (req, res) => {
    res.send(await Payment.find({ is_deleted: false }))
}

export const addPayment = async (req, res) => {
    try {
        const { username, amount, currency } = req.body
        const user = await User.findOne({username: username})
        const customer_id = user.id

        const payment = new Payment({
            customer_id: customer_id,
            amount: amount,
            currency: currency
        })

        await axios.patch(`localhost:5000/users/${customer_id}`, {
            payment_id: payment.id
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))

        await payment.save()
        res.send(`Payment with the id ${payment.id} has been created`)
    }
    catch (error) {
        res.send(`There has been an error: ${error}`)
    }
}

export const getPayment = async (req, res) => {
    try {
        const { id } = req.params
        const payment = await Payment.findById(id)
        if(!payment.is_deleted) res.send(payment)
        else res.send(`Payment with the id ${id} no longer exists`)
    }
    catch (error) {
        res.send(`an error has occured: ${error}`)
    }
}

export const editPayment = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const payment = await Payment.findById(id)
        if(status === STATUS.PAID || status === STATUS.CANCELLED) {
            payment.status = status
            if(status === STATUS.PAID) payment.paid_date = Date.now()
            await payment.save()
            res.send(`The status of the payment has been changed to ${status}`)
        }
        else res.send(`The status ${status} does not match any possible status`)
    }
    catch (error) {
        res.send(`an error has occured: ${error}`)
    }
}

export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params
        const payment = await Payment.findById(id)
        payment.is_deleted = true
        payment.$isDeleted(true)
        await payment.save()
        res.send(`Payment with the id ${id} has been deleted`)
    }
    catch (error) {
        res.send(`an error has occured: ${error}`)
    }
}