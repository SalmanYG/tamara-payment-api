import express from 'express'
import { getUsers, addUser, getUser, deleteUser } from '../controllers/users.js'

const router = express.Router()

router.get('/', getUsers)

router.post('/', addUser)

router.get('/:id', getUser)

router.delete('/:id', deleteUser)

export default router