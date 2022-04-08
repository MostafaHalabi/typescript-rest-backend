import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { Users } from '../../models'

export default async (req: Request, res: Response) => {
  try {
    // delete user
    await Users.findByIdAndDelete(req.params.id)

    return res.status(200).json({
      message: 'User deleted successfully',
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
      message: 'Internal Server err',
      status: 'error',
      requestTime: new Date().toISOString()
    })
  }
}
