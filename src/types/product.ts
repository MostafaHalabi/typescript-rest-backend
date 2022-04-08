import { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  price: number
  description: string
  image: string
  user: Schema.Types.ObjectId
  quantity: number
}
