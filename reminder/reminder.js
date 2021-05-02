import schedlue from 'node-schedule'
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

import { STATUS } from '../controllers/payments.js'

import 'dotenv/config.js'

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}))

const setReminder = (user, payment) => {

    const message = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Your Payment ${payment.id} Is Overdue`,
        text: 
        `Dear ${user.username},
        Your scheduled payment with the ID: ${payment.id} and the amount: ${payment.amount} ${payment.currency} is overdue. Please pay as soon as possible.
        
        Regards,
        Tamara.`
    }

    schedlue.scheduleJob(payment.due_date, () => {
        if(payment.status === STATUS.UNPAID) {
            transporter.sendMail(message, () => {
                payment.status = STATUS.OVERDUE
            })
        }
        
    })
}

export default setReminder