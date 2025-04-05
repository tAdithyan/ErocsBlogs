import Comment from "../model/comments.model.js";
import Articles from "../model/articles.model.js";



export const Createcomment = async (req,res) =>{
    try {
        const {article,author,comment } = req.body;

        const articleExists = await Articles.findById(article);
        if (!articleExists) {
            return res.status(404).json({
                message: "Article not found",
            });
        }
        
        
        const newComment = new Comment({article,author,comment});
        await newComment.save();
        articleExists.comments.push(newComment._id);
        await articleExists.save();
        // Assuming you want to populate the author field with user details
        res.status(201).json({
            message: "Comment created successfully",
            comment: newComment,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}


export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(id, { comment }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}