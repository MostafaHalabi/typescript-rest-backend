import { model, Schema } from 'mongoose'
import { IProduct } from '../types'

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model<IProduct>('Product', productSchema)
