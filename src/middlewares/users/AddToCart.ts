import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { Products, Users } from '../../models'
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, quantity, userId } = req.body

    //check if userId is not empty
    if (!userId || userId === '') {
      return res.status(400).json({
        status: 'error',
        message: 'userId is required',
        requestTime: new Date().toISOString()
      })
    }

    //check if userId is type of ObjectId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid user id',
        requestTime: new Date().toISOString()
      })
    }

    //check if userId exists
    const user = await Users.findById(userId)
    if (!user) {
      return res.status(400).json({
        status: 'error',

        message: 'userId is not valid',
        requestTime: new Date().toISOString()
      })
    }

    //check if productId is not empty
    if (!productId || productId === '') {
      return res.status(400).json({
        status: 'error',
        message: 'productId is required',
        requestTime: new Date().toISOString()
      })
    }

    //check if if quantity is positive
    if (parseInt(quantity) <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'quantity must be a positive number',
        requestTime: new Date().toISOString()
      })
    }

    //check if productId is type of ObjectId
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid product id',
        requestTime: new Date().toISOString()
      })
    }

    //check if productId exists
    const product = await Products.findById(productId)
    if (!product) {
      return res.status(400).json({
        status: 'error',

        message: 'productId is not valid',
        requestTime: new Date().toISOString()
      })
    }

    next()
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    } else {
      console.log(err)
    }
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server error',
      requestTime: new Date().toISOString()
    })
  }
}
