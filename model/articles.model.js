import mongoose from "mongoose";
const ArticlesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    published_date: { type: Date, default: Date.now },
    is_published: { type: Boolean, required: true, default: false },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
    is_active: { type: Boolean, required: true ,default: true },
    is_delete: { type: Boolean, required: true,default: false },
});

const Articles = mongoose.model("Articles", ArticlesSchema);
export default Articles;    