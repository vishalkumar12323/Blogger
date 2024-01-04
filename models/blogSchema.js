import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    blogThumbnail: {
        type: String,
        default: '/assets/download.jpg'
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Blog = new model('blog', blogSchema);

export { Blog };