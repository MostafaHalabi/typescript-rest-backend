import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { Users } from '../../models'
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate if id is mongoose objectId
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid id',
        requestTime: new Date().toISOString()
      })
    }

    //validate if user exists
    const user = await Users.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
        requestTime: new Date().toISOString()
      })
    }

    next()
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      requestTime: new Date().toISOString()
    })
  }
}
