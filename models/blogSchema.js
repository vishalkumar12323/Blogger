import { Schema, model } from "mongoose";

const blogSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true });

const Blog = new model('blog', blogSchema);

export { Blog };