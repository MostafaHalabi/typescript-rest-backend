import { NextFunction, Request, Response } from 'express'
import { Users } from '../../models'
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fname, lname, email, password } = req.body

    if (!fname || fname === '') {
      return res.status(400).json({
        status: 'error',
        message: 'fname is required',
        requestTime: new Date().toISOString()
      })
    }
    if (fname.length < 3) {
      return res.status(400).json({
        status: 'error',
        message: 'fname must be at least 3 characters',
        requestTime: new Date().toISOString()
      })
    }

    if (!lname || lname === '') {
      return res.status(400).json({
        status: 'error',
        message: 'lname is required',
        requestTime: new Date().toISOString()
      })
    }
    if (lname.length < 3) {
      return res.status(400).json({
        status: 'error',
        message: 'lname must be at least 3 characters',
        requestTime: new Date().toISOString()
      })
    }

    if (!email || email === '') {
      return res.status(400).json({
        status: 'error',
        message: 'email is required',
        requestTime: new Date().toISOString()
      })
    }

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'email is not valid',
        requestTime: new Date().toISOString()
      })
    }

    //CHECK IF EMAIL ALREADY EXISTS
    const emailExists = await Users.findOne({ email })
    if (emailExists) {
      return res.status(400).json({
        status: 'error',
        message: 'email already exists',
        requestTime: new Date().toISOString()
      })
    }

    if (!password || password === '') {
      return res.status(400).json({
        status: 'error',
        message: 'password is required',
        requestTime: new Date().toISOString()
      })
    }
    if (password.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'password must be at least 6 characters',
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
