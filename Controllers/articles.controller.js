import  Articles from '../model/articles.model.js';
import  Category from '../model/category.model.js';
import  User from '../model/user.model.js';
import { deleteImageFromUploads } from '../utils/deleteImageFromUploads.js';


export const createArticles =  async (req, res) => {
    try {
        const { title, author, category, description } = req.body;
        const user = await User.findById(author);
        if (!user) {
            return res.status(404).json({ message: 'Author not found' });
        }
        const categoryFound = await Category.findById(category);
        if (!categoryFound) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const imageUrl = req.file
        ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        : null;
        const newArticle = new Articles({
            title,
            author,
            category,
            description,
            image:imageUrl,
            is_active: true,
            is_delete: false
        });
        await newArticle.save();
        res.status(201).json({ message: 'Article created successfully', article: newArticle });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error',error: error.message });
  
    }
  };
  
  export const getAllArticles = async (req, res) => {
    try {
      const { userId, categoryId } = req.query;
  
      const filter = {};
      if (userId) filter.author = userId;
      if (categoryId) filter.category = categoryId;
  
      const articles = await Articles.find(filter)
      .populate('author', 'email')
    
    
  
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  

  export const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Articles.findById(id).populate('author', 'email')  .populate('category', 'name')
        .populate({
          path: 'comments',
          select: 'comment createdAt',
          populate: {
            path: 'author',
            select: 'email'
          }
        });
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };



  export const updateArticle = async (req, res) => {
try {
    const {id} = req.params;
    const { title, category, description } = req.body;
    if(category){
        const categoryFound = await Category.findById(category);
        if (!categoryFound) {
            return res.status(404).json({ message: 'Category not found' });
        }
    }
    const imageUrl = req.file
    ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    : null;
    const article = await Articles.findById(id);
    if (!article) {
        return res.status(404).json({ message: 'Article not found' });
    }
        if (req.file) {
                deleteImageFromUploads(article.image);
                article.image = imageUrl;
              }
              if(title) {
                article.title = title;
              }
              if(author) {
                article.author = author;
              }
              if(category) {
                article.category = category;
              }
              if(description) {
                article.description = description;
              }
                await article.save();
                res.status(200).json({ message: 'Article updated successfully', article });

} catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
    
}  


}



export const deleteArticle = async (req, res) => {
try {
    const {id} = req.params;
    const article = await Articles.findById(id);
    if (!article) {
        return res.status(404).json({ message: 'Article not found' });
    }
    deleteImageFromUploads(article.image);
    article.is_delete = true;
    article.is_active = false;
    article.is_published = false;
    await article.save();
    await Articles.findByIdAndDelete(id);
    res.status(200).json({ message: 'Article deleted successfully' });
} catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
}


}


export const publishArticle = async (req, res) => {
try {
    const { id } = req.params;
    const article = await Articles.findById(id);
    if (!article) {
        return res.status(404).json({ message: 'Article not found' });
    }
    article.is_published = true;
    await article.save();
    res.status(200).json({ message: 'Article published successfully', article });
}
 
catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
}
}


export const unpublishedArticles = async (req, res) => {
try {
    const article = await Articles.find({is_published :false}).populate('author', 'email').populate('category', 'name');;
    if (!article) {
        return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json({ message: 'Article unpublished successfully', article });
}
catch{
    res.status(500).json({ message: 'Internal server error', error: error.message });
}
}


export const getArticleByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const articles = await Articles.find({ author: userId }).populate('author', 'email').populate('category', 'name');
        if (!articles) {
            return res.status(404).json({ message: 'No articles found for this user' });
        }
        res.status(200).json(articles);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };


export const searchArticles = async (req, res) => {
    try {
      const { query } = req.query;
  
      if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
      }
      const regex = new RegExp(`\\b${query}\\b`, 'i'); 

      const articles = await Articles.find({
        $or: [
            { title: { $regex: regex } },
            { description: { $regex: regex } }
        ]
      }).populate('author', 'email').populate('category', 'name');
  
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  