import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    payments: [{
        payment_id: String
    }],
    is_deleted: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Users', UserSchema)