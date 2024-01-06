import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    blogThumbnail: {
        type: String,
        default: '/assets/javascript.jpg'
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true });

const Blog = new model('blog', blogSchema);

export { Blog };