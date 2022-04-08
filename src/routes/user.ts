import express from 'express'
import { GetAllUsers, AddUser, DeleteUser } from '../controllers'
import { AddUserMiddleware, DeleteUserMiddleware } from '../middlewares'
const router = express.Router()

router.get('/all-users', GetAllUsers)
router.post('/add-user', AddUserMiddleware, AddUser)
router.delete('/delete-user/:id', DeleteUserMiddleware, DeleteUser)
export default router
