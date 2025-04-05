import { Router } from "express";
import { CreateCategory,GetCategory,UpdateCategory,DeleteCategory} from "../Controllers/category.controller.js";
import upload from "../config/multerConfig.js"; 


const categoryRouter = Router();

categoryRouter.post("/createCategory", upload.single("image"), CreateCategory); 
categoryRouter.get("/getCategory", GetCategory);
categoryRouter.put("/updateCategory/:id", upload.single("image"), UpdateCategory);
categoryRouter.delete("/deleteCategory/:id",DeleteCategory)
export default categoryRouter;
