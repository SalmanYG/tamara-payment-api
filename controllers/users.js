import User from '../models/user.js'

export const getUsers = async (req, res) => {
    res.send(await User.find({is_deleted: false}))
}

export const addUser = async (req, res) => {
    try {
        const { username, email } = req.body
        console.log(username, email)
        const user = new User({
            username: username,
            email: email
        })
        const newUser = await user.save()
        res.send(newUser)
    }
    catch (error) {
        res.send(`There has been an error: ${error}`)
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if(!user.is_deleted) res.send(user)
        else res.send("this user does not exist")
    }
    catch (error) {
        res.send(`an error has occured: ${error}`)
    }
    
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { payment_id } = req.body
        const user = await User.findById(id)
        user.payments.push({payment_id: payment_id})
        await user.save()
        res.send(`User with the id ${id} has been updated`)

    }
    catch (error) {
        res.send(`an error has occured: ${error}`)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        user.is_deleted = true
        user.$isDeleted(true)
        await user.save()
        res.send(`user with the id ${id} has been deleted`)
    }
    catch (error) {
        res.send(`an error has occured: ${error}`)
    }
    
}