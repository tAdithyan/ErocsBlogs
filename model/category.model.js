import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    discription: { type: String, required: false },
    Image: { type: String, required: false },
    is_active: { type: Boolean, required: true,default: true },
    is_delete: { type: Boolean, required: true , default: false},
});

const Category = mongoose.model("Categories", CategorySchema);
export default Category;