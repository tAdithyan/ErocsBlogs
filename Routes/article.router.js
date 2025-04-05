import { createArticles,getAllArticles,getArticleById,updateArticle,deleteArticle,publishArticle,unpublishedArticles,getArticleByUserId,searchArticles } from "../Controllers/articles.controller.js";
import Router from "express";
import upload from "../config/multerConfig.js";
 const articleRouter = Router()


articleRouter.post("/createArticles", upload.single("image"), createArticles);
articleRouter.get("/getAllArticles", getAllArticles);
articleRouter.get("/getArticles/:id", getArticleById);
articleRouter.put("/updateArticles/:id", upload.single("image"), updateArticle);
articleRouter.delete("/deleteArticles/:id", deleteArticle);
articleRouter.put("/publishArticles/:id", publishArticle);
articleRouter.get("/unpublishedArticles", unpublishedArticles);
articleRouter.get("/getArticlesByUserId/:userId", getArticleByUserId)
articleRouter.get("/searchArticles", searchArticles)

export default articleRouter;