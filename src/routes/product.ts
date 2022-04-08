import express from 'express'
import { AddProduct, GetAllProducts } from '../controllers'
import { AddProductMiddleware } from '../middlewares'
const router = express.Router()

router.get('/all-products', GetAllProducts)
router.post('/add-product', AddProductMiddleware, AddProduct)

export default router
