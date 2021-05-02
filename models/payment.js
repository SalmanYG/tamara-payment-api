import mongoose from 'mongoose'
const { Schema } = mongoose

const PaymentSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "unpaid"
    },
    payment_date: {
        type: Date,
        default: Date.now
    },
    due_date: {
        type: Date,
        default: () => Date.now() + 10*60*1000
    },
    paid_date: Date,
    is_deleted: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Payments', PaymentSchema)