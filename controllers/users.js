import User from '../models/user.js'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({is_deleted: false}).populate("payments").exec()
        res.send(users)
    }
    catch (error) {
        res.send(error)
    }
    
}

export const addUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.send(user)
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