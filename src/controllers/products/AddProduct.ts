import { Request, Response } from 'express'
import { Products } from '../../models'

export default async (req: Request, res: Response) => {
  try {
    //add product
    const newProduct = await Products.create(req.body)

    return res.status(200).json({
      message: 'Product added successfully',
      status: 'success',
      requestTime: new Date().toISOString()
    })
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    } else {
      console.log(err)
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal Server erroR',
      requestTime: new Date().toISOString()
    })
  }
}
