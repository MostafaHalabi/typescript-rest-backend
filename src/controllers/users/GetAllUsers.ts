import { Request, Response } from 'express'
import { Users } from '../../models'

export default async (req: Request, res: Response) => {
  try {
    // get all users
    const allUsers = await Users.find({})
      .select('-password')
      .populate('cart.product', '-quantity')

    return res.status(200).json({
      users: allUsers,
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
