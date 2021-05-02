import express from 'express'
import { getPayments, addPayment, getPayment, editPayment, deletePayment } from '../controllers/payments.js'

const router = express.Router()

router.get('/', getPayments)

router.post('/', addPayment)

router.get('/:id', getPayment)

router.patch('/:id', editPayment)

router.delete('/:id', deletePayment)

export default router