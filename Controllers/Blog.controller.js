const mongoose = require('mongoose');
const Joi = require('joi');
const BlogModel = require('../Models/blogModels')

const PostArticle = async (req, res, next) => {
    const BlogSchema = Joi.object({
        title: Joi.string().min(3).required(),
        content: Joi.string().min(20).required(),
        status: Joi.string().valid('draft', 'published').default('draft'),
        category: Joi.string().valid('Technology', 'General', 'Housing').required()
    });

    const { error, value } = BlogSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    try {
        const newArticle = new BlogModel({...value,
            author: req.user._id,
            
        });
        await newArticle.save();
        return res.status(200).json({ message: "Article created successfully", data: newArticle });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};


const getAllArticle = async (req, res, next) => {

    const { limit = 15, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    try {
        const filter = {}
        if (req.query.category) {
            filter.category = req.query.category
        }
        console.log(req.user);
        const articles = await BlogModel.find(filter).sort({ createdAt: -1 }).limit(limit).skip(skip).populate('author', 'name _id email');
        return res.status(200).json({
            data: articles
        });

    } catch (error) {
        console.error(error);
        next(error);
    }

};

const searchAllArticle = async (req, res, next) => {
    try {
        const search = req.query.q
        if (!search) {
            return res.status(400).json({ message: 'provide a search keyword' })
        };
        const article = await BlogModel.find({
            $text: { $search: search }
        });
        res.status(200).json({ data: article });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


const getAllArticleById = async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid article ID format" });
        }
        const article = await BlogModel.findByIdAndUpdate(req.params.id,
            { $inc: { views: 1 } },
            { new: true });

        if (!article) {
            return res.status(404).json({ message: `Article ${req.params.id} not found` })
        }
        return res.status(200).json(article);
    } catch (error) {
        console.error(error)
        next(error);
    }
};

const updateArticleById = async (req, res, next) => {
    const BlogSchema = Joi.object({
        title: Joi.string().min(3).optional(),
        content: Joi.string().min(20).optional(),
        status: Joi.string().valid('draft', 'published').optional(),
        category: Joi.string().valid('Technology', 'General', 'Housing').optional()
    });
    const { error, value } = BlogSchema.validate(req.body)

    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    try {

        const article = await BlogModel.findById(req.params.id);
        if (!article.author.equals(req.user._id)) {
            return res.status(403).json({ message: "You are not authorized to update this article" });
        }
        const updatedArticle = await BlogModel.findByIdAndUpdate(req.params.id, { ...value},
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedArticle) {
            return res.status(404).json(`Article ${req.params.id} not updated`);
        };
        res.status(200).json({
            message: `Article ${req.params.id} updated`,
            data: updatedArticle
        })
    } catch (error) {
        console.error(error)
        next(error);
    };
};


const deleteArticleById = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid article ID format" });
        }
        const article = await BlogModel.findById(req.params.id);
        if (!article) {
            return res.status(404).json(`Article ${req.params.id} not found`)
        }

        if (!article.author.equals(req.user._id)) {
            return res.status(403).json({ message: "You are not authorized to delete this article" });
        }

        await BlogModel.findByIdAndDelete(req.params.id);

        return res.status(200).json(`Article ${req.params.id} deleted successfully`)
    } catch (error) {
        console.error(error)
        next(error);
    }
};


module.exports = {
    PostArticle, getAllArticle, searchAllArticle, getAllArticleById, updateArticleById, deleteArticleById
};
