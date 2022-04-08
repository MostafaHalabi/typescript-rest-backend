import { Request, Response } from 'express'
import { Products } from '../../models'

export default async (req: Request, res: Response) => {
  try {
    // get all products
    const allProducts = await Products.find({})

    return res.status(200).json({
      products: allProducts,
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
      message: '[i] Internal Server Error'.red,
      requestTime: new Date().toISOString()
    })
  }
}
