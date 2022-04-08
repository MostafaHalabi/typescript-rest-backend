import express from 'express'
import { GetAllUsers, AddUser, DeleteUser, AddToCart } from '../controllers'
import {
  AddToCartMiddleware,
  AddUserMiddleware,
  DeleteUserMiddleware
} from '../middlewares'
const router = express.Router()

router.get('/all-users', GetAllUsers)
router.post('/add-user', AddUserMiddleware, AddUser)
router.delete('/delete-user/:id', DeleteUserMiddleware, DeleteUser)
router.post('/add-cart', AddToCartMiddleware, AddToCart)
export default router
