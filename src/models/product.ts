import { model, Schema } from 'mongoose'
import { IProduct } from '../types'

const productSchema = new Schema<IProduct>({
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  quantity: {
    type: Number,
    required: true
  }
})

export default model<IProduct>('Product', productSchema)
