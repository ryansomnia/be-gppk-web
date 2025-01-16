const express = require('express');
const router = express.Router();
const user = require('./controller/adminController');

const articleController = require('./controller/articleController');
const service = require('./controller/service');
const reportBible = require('./controller/reportBible');

// const authMiddleware = require('../middleware/authMiddleware');

router.post('/cbn/v1/user/login', user.login);
router.post('/cbn/v1/user/register', user.register);


router.post('/cbn/v1/artikel/addOneArticle', articleController.addArtikel);
router.get('/cbn/v1/artikel/getAllArticle', articleController.getAllData);
router.post('/cbn/v1/artikel/getDataByKategori', articleController.getDataByKategori);
router.post('/cbn/v1/artikel/deleteOneData', articleController.deleteOneData);

router.post('/cbn/v1/service/doa/formDoa', service.formDoa)
router.get('/cbn/v1/service/doa/getAll', service.getAll)

router.get('/cbn/v1/reportBible/getAll', reportBible.getAll)
router.post('/cbn/v1/reportBible/inputSchedule', reportBible.inputSchedule)
router.post('/cbn/v1/reportBible/readingProgress', reportBible.readingProgress)
router.get('/cbn/v1/reportBible/getTodaySchedule', reportBible.getTodaySchedule)


// Routes for articles
// router.post('/create', authMiddleware, articleController.createArticle);
// router.get('/', articleController.getArticles);
// router.delete('/:id', authMiddleware, articleController.deleteArticle);

// // Register route
// router.post('/register', registerAdmin);

// // Login route
// router.post('/login', loginAdmin);

module.exports = router;
