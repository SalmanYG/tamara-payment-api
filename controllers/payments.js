import User from '../models/user.js'
import Payment from '../models/payment.js'
import setReminder from '../reminder/reminder.js'

export const STATUS = {
    PAID: "paid",
    UNPAID: "unpaid",
    OVERDUE: "overdue",
    CANCELLED: "cancelled"
}

export const getPayments = async (req, res) => {
    try {
        res.send(await Payment.find({ is_deleted: false }))
    } catch (error) {
        res.send(`AN ERROR HAS OCCURED: ${error}`)
    }
}

export const addPayment = async (req, res) => {
    try {
        const { username, amount, currency } = req.body
        const user = await User.findOne({ username: username })
        const customer_id = user.id
        const payment = new Payment({
            customer_id: customer_id,
            amount: amount,
            currency: currency
        })
        await payment.save()
        user.payments.push(payment)
        await user.save()
        setReminder(user, payment)
        res.send(`Payment with the id ${payment.id} has been created, a reminder should be sent after 30 days`)
    } catch (error) {
        res.send(`AN ERROR HAS OCCURED: ${error}`)
    }
}

export const getPayment = async (req, res) => {
    try {
        const { id } = req.params
        const payment = await Payment.findById(id)
        if (payment.is_deleted) throw new Error(`Payment with the id ${id} no longer exists`)
        res.send(payment)
    } catch (error) {
        res.send(`AN ERROR HAS OCCURED: ${error}`)
    }
}

export const editPayment = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const payment = await Payment.findById(id)
        if (status === STATUS.PAID) {
            payment.status = status
            payment.paid_date = Date.now()
            await payment.save()
            res.send(`The status of the payment has been changed to ${status}`)
        }
        else throw new Error(`The entered status '${status}' does not match any possible status`)
    } catch (error) {
        res.send(`AN ERROR HAS OCCURED: ${error}`)
    }
}

export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params
        const payment = await Payment.findById(id)
        payment.is_deleted = true
        payment.$isDeleted(true)
        payment.status = STATUS.CANCELLED
        await payment.save()
        res.send(`Payment with the id ${id} has been deleted`)
    } catch (error) {
        res.send(`AN ERROR HAS OCCURED: ${error}`)
    }
}