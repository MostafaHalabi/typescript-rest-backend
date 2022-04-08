import { NextFunction, Request, Response } from 'express'
import { Products } from '../../models'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, description, image, quantity } = req.body

    if (!name || name === '') {
      return res.status(400).json({
        status: 'error',
        message: 'name is required',
        requestTime: new Date().toISOString()
      })
    }
    if (name.length < 3) {
      return res.status(400).json({
        status: 'error',
        message: 'name must be at least 3 characters',
        requestTime: new Date().toISOString()
      })
    }

    if (!price || price === '') {
      return res.status(400).json({
        status: 'error',
        message: 'price is required',
        requestTime: new Date().toISOString()
      })
    }

    if (parseInt(price) < 0) {
      return res.status(400).json({
        status: 'error',
        message: 'price must be a positive number',
        requestTime: new Date().toISOString()
      })
    }

    if (!description || description === '') {
      return res.status(400).json({
        status: 'error',
        message: 'description is required',
        requestTime: new Date().toISOString()
      })
    }

    if (!image || image === '') {
      return res.status(400).json({
        status: 'error',
        message: 'image is required',
        requestTime: new Date().toISOString()
      })
    }

    if (!quantity || quantity === '') {
      return res.status(400).json({
        status: 'error',
        message: 'quantity is required',
        requestTime: new Date().toISOString()
      })
    }

    if (parseInt(quantity) < 0) {
      return res.status(400).json({
        status: 'error',
        message: 'quantity must be a positive number',
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
      sttus: 'error',
      message: 'Internal Server error',
      requestTime: new Date().toISOString()
    })
  }
}
