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
        type: Schema.Types.ObjectId,
        ref: "Payments" //call the name of the needed model
    }],
    is_deleted: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Users', UserSchema)