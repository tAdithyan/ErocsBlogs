import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Articles', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    comment: { type: String, required: false },
    Created_date: { type: Date, default: Date.now },
    is_active: { type: Boolean, required: true ,default: true},
    is_delete: { type: Boolean, required: true,default: false },
});

const Comment = mongoose.model("Comments", CommentSchema);
export default Comment;