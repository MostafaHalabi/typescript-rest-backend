import { Document } from 'mongoose'
import { IProduct } from './index'
export interface IUser extends Document {
  fname: string
  lname: string
  fullName: string
  password: string
  email: string
  cart: IProduct[]
}
