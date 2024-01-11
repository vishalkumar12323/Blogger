import { mongoose } from "../import/import.js";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: '/assets/javascript.jpg'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true });

const Blog = new mongoose.model('blog', blogSchema);

export { Blog };