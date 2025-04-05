import Category from "../model/category.model.js";
import { deleteImageFromUploads } from "../utils/deleteImageFromUploads.js"; 

export const CreateCategory = async (req, res) => {
    try {
      const { name, discription } = req.body;
  
      const imageUrl = req.file
        ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        : null;
  const category = await Category.findOne({ name });
  if (category) {
    return res.status(400).json({ message: "Category already exists" });
  }
      const Newcategory = new Category({
        name,
        discription,
        Image: imageUrl, 
      });
  
      await Newcategory.save();
  
      return res.status(201).json({
        message: "Category created successfully",
        category: {
          ...Newcategory.toObject(),
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  };



export const GetCategory = async (req,res) =>{
    try {
        const response = await Category.find();
        return res.status(200).json({
            message: "Category fetched successfully",
            response
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message    
        });
    }
}


export const UpdateCategory = async (req,res) =>{
    try {
        const {name,discription} = req.body;
        const {id}= req.params;
        if (!id) {
            return res.status(400).json({ message: "Category ID is required" });
          }
          const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
          : null;
    
        const category = await Category.findById(id);
        if (!category) {
          return res.status(404).json({ message: "Category not found" });
        }
        
        if (req.file) {
            deleteImageFromUploads(category.Image);
            category.Image = imageUrl;
          }

  if (name) category.name = name;
    if (discription) category.discription = discription;
            await category.save();
        return res.status(200).json({
            message: "Category updated successfully",
            category
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}


 export const DeleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      deleteImageFromUploads(category.Image);
  
      await Category.findByIdAndDelete(id);
  
      return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  };
  







