import { mongoose } from "../import/import.js"
const connectDB = async (url) => mongoose.connect(url);

export { connectDB };