import { Document } from 'mongoose'
export interface IUser extends Document {
  fname: string
  lname: string
  fullName: string
  password: string
  email: string
}
