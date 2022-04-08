import mongoose from 'mongoose'
const connectDb = async () => {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI)
      console.log(`[i] MongoDB connected successfully 🚀`.green)
    } else {
      console.log(`[i] MongoDB is not connected`.red)
      process.exit(1)
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    } else {
      console.log(err)
    }
    process.exit(1)
  }
}
export default connectDb
