const express = require('express');
const {
    PostArticle, getAllArticle, searchAllArticle,
    getAllArticleById, updateArticleById,
    deleteArticleById
} = require('../Controllers/Blog.controller');
const requireAuth = require('../Middlewares/requireAuth');
const router = express.Router();

router.post('/articles', requireAuth, PostArticle);


router.get('/articles', requireAuth, getAllArticle);


router.get('/articles/search', searchAllArticle);


router.get('/articles/:id', requireAuth, getAllArticleById);


router.put('/articles/:id', requireAuth, updateArticleById);


router.delete('/articles/:id', requireAuth, deleteArticleById);

module.exports = router;

