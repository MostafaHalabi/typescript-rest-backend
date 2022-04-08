import { Request, Response } from 'express'
import { Users } from '../../models'

export default async (req: Request, res: Response) => {
  try {
    const { productId, quantity, userId } = req.body

    //add item to user's cart

    const newItem = await Users.findByIdAndUpdate(
      userId,
      {
        $push: {
          cart: {
            product: productId,
            quantity: quantity
          }
        }
      },
      { new: true }
    ).populate('cart.product')

    return res.status(200).json({
      message: 'Product added to cart successfully',
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
