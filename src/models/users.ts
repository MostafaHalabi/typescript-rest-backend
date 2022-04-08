import { Schema, model } from 'mongoose'
import { IUser } from '../types'
import * as bcrypt from 'bcrypt'

const cartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  {
    _id: false
  }
)

const userSchema = new Schema<IUser>(
  {
    fname: {
      type: String,
      required: true,
      minlength: 3
    },
    lname: {
      type: String,
      required: true,
      minlength: 3
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    email: {
      type: String,
      required: true
    },
    cart: [cartSchema]
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      getters: true
    },
    toObject: {
      virtuals: true,
      getters: true
    }
  }
)
userSchema
  .virtual('fullName')
  .get(function (this: IUser) {
    return `${this.fname} ${this.lname}`
  })
  .set(function (this: IUser, v: any) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.

    const firstName = v.substring(0, v.indexOf(' '))
    const lname = v.substring(v.indexOf(' ') + 1)
    this.set({ firstName, lname })
  })

userSchema.pre<IUser>('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  next()
})

export default model<IUser>('Users', userSchema)
