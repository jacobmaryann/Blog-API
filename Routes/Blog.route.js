const express = require('express');
const {
    PostArticle, getAllArticle, searchAllArticle,
    getAllArticleById, updateArticleById,
    deleteArticleById
} = require('../Controllers/Blog.controller')
const router = express.Router();

router.post('/articles', PostArticle);


router.get('/articles', getAllArticle);


router.get('/articles/search', searchAllArticle);


router.get('/articles/:id', getAllArticleById);


router.put('/articles/:id', updateArticleById);


router.delete('/articles/:id', deleteArticleById);

module.exports = router;

