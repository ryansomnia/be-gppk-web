const express = require('express');
const router = express.Router();
// const { registerAdmin, loginAdmin } = require('../controllers/adminController');

const articleController = require('./controller/articleController');
const service = require('./controller/service');

// const authMiddleware = require('../middleware/authMiddleware');



router.post('/cbn/v1/artikel/addOneArticle', articleController.addArtikel);
router.post('/cbn/v1/artikel/getDataByKategori', articleController.getDataByKategori);

router.post('/cbn/v1/service/doa', service.formDoa)

// Routes for articles
// router.post('/create', authMiddleware, articleController.createArticle);
// router.get('/', articleController.getArticles);
// router.delete('/:id', authMiddleware, articleController.deleteArticle);

// // Register route
// router.post('/register', registerAdmin);

// // Login route
// router.post('/login', loginAdmin);

module.exports = router;
