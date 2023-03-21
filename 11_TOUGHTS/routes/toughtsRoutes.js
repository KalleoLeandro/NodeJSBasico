const express = require('express');
const router = express.Router();
const ToughtController = require('../controllers/ToughtController')

const checkAuth = require('../middlewares/auth').checkAuth;

//controllers
router.get('/', checkAuth, ToughtController.showToughts);
router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.get('/add', checkAuth, ToughtController.createTought);
router.post('/add', checkAuth, ToughtController.createToughtSave)
router.post('/remove', checkAuth, ToughtController.removeTought);
router.get('/edit/:id', checkAuth, ToughtController.updateTought);
router.post('/edit',checkAuth, ToughtController.updateToughtSave);

module.exports = router;
