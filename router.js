const express = require('express');
const router = express.Router();
const user = require('./controller/adminController');

const articleController = require('./controller/articleController');
const service = require('./controller/service');
const reportBible = require('./controller/reportBible');
const youtube = require('./controller/youtube');
const cabang = require('./controller/cabang');
const kesaksian = require('./controller/kesaksian');
const kka = require('./controller/kka');


// const authMiddleware = require('../middleware/authMiddleware');

router.post('/cbn/v1/user/login', user.login);
router.post('/cbn/v1/user/register', user.register);

router.get('/cbn/v1/kka/getAll', kka.getAllData);
router.post('/cbn/v1/kka/addOne', kka.addKKA);
router.post('/cbn/v1/kka/deleteOne', kka.deleteKKA);
router.post('/cbn/v1/kka/editOne', kka.editKKA);


router.post('/cbn/v1/artikel/addOneArticle', articleController.addArtikel);
router.post('/cbn/v1/artikel/uploadbahanKKA', articleController.uploadBahanSharing);
router.get('/cbn/v1/artikel/bahanKKA', articleController.getBahanKKA);
router.get('/cbn/v1/artikel/newBahanKKA', articleController.newBahanKKA);
router.post('/cbn/v1/artikel/deleteRenungan', articleController.deleteRenungan);
router.post('/cbn/v1/artikel/updateOneData/', articleController.updateOneData);
router.post('/cbn/v1/artikel/updateOneRenunganData/', articleController.updateOneRenunganData);





router.get('/cbn/v1/artikel/getAllArticle', articleController.getAllData);
router.post('/cbn/v1/artikel/getDataByKategori', articleController.getDataByKategori);
router.get('/cbn/v1/artikel/getOneMembacaAlkitab', articleController.getOneMembacaAlkitab);

router.post('/cbn/v1/artikel/deleteOneData', articleController.deleteOneData);

router.get('/cbn/v1/youtube/getAllYoutube', youtube.getAllData);
router.post('/cbn/v1/youtube/addData', youtube.addData);
router.post('/cbn/v1/youtube/deleteData', youtube.deleteData);
router.post('/cbn/v1/youtube/updateData', youtube.updateData);

router.post('/cbn/v1/kesaksian/addOneData', articleController.addArtikel);


router.post('/cbn/v1/service/doa/formDoa', service.formDoa)
router.get('/cbn/v1/service/doa/getAll', service.getAll)
router.post('/cbn/v1/service/doa/deleteOne', service.deleteOneData)

router.get('/cbn/v1/service/baptisan/getFormBaptisan', service.getFormBaptisan)
router.post('/cbn/v1/service/baptisan/addFormBaptisan', service.formBaptisan)
router.post('/cbn/v1/service/baptisan/deleteFormBaptisan', service.deleteDataBaptisan)

router.get('/cbn/v1/service/konseling/getData', service.getKonselingData)
router.post('/cbn/v1/service/konseling/addData', service.addKonsultasiData)
router.post('/cbn/v1/service/konseling/deleteOneData', service.deleteDataKonsultasi)

router.get('/cbn/v1/service/pelayan/getData', service.getPelayanData)
router.post('/cbn/v1/service/pelayan/addData', service.addPelayanData)
router.post('/cbn/v1/service/pelayan/deleteOneData', service.deleteDataPelayan)

router.get('/cbn/v1/service/pernikahan/getData', service.getPernikahanData)
router.post('/cbn/v1/service/pernikahan/addData', service.addPernikahanData)
router.post('/cbn/v1/service/pernikahan/deleteOneData', service.deleteDataPernikahan)

router.get('/cbn/v1/service/pemberkatanRumah/getData', service.getPemberkatanRumah)
router.post('/cbn/v1/service/pemberkatanRumah/addData', service.addPemberkatanRumahData)
router.post('/cbn/v1/service/pemberkatanRumah/deleteOneData', service.deleteDataPemberkatanRumah)

router.get('/cbn/v1/service/penyerahanAnak/getData', service.getPenyerahanAnak)
router.post('/cbn/v1/service/penyerahanAnak/addData', service.addPenyerahanAnak)
router.post('/cbn/v1/service/penyerahanAnak/deleteOneData', service.deleteDataPenyerahanAnak)


router.get('/cbn/v1/artikel/kesaksian/getAllData', kesaksian.getAllData)
router.post('/cbn/v1/artikel/kesaksian/addArtikel', kesaksian.addArtikel)
router.post('/cbn/v1/artikel/kesaksian/deleteOneData', kesaksian.deleteOneData)


router.get('/cbn/v1/reportBible/getAll', reportBible.getAll)
router.post('/cbn/v1/reportBible/inputSchedule', reportBible.inputSchedule)
router.post('/cbn/v1/reportBible/readingProgress', reportBible.readingProgress)
router.get('/cbn/v1/reportBible/getTodaySchedule', reportBible.getTodaySchedule)

router.get('/cbn/v1/cabang/getAllData',  cabang.getAllData)
router.post('/cbn/v1/cabang/addCabang',  cabang.addCabang)
router.post('/cbn/v1/cabang/deleteCabang',  cabang.deleteCabang)


// Routes for articles
// router.post('/create', authMiddleware, articleController.createArticle);
// router.get('/', articleController.getArticles);
// router.delete('/:id', authMiddleware, articleController.deleteArticle);

// // Register route
// router.post('/register', registerAdmin);

// // Login route
// router.post('/login', loginAdmin);

module.exports = router;
