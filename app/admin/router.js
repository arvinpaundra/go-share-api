const { getAllCreators, viewEditCreator, actionEditCreator } = require('./creators/controller');
const { dashboard } = require('./dashboard/controller');
const multer = require('multer');
const os = require('os');
const {
  getAllContents,
  viewEditContent,
  actionEditContent,
  actionDeleteContent,
} = require('./contents/controller');
const {
  getAllVouchers,
  viewEditVoucher,
  actionCreateVoucher,
  actionEditVoucher,
  viewCreateVoucher,
  actionDeleteVoucher,
} = require('./vouchers/controller');
const { getAllTransactions, actionStatus } = require('./transactions/controller');
const { viewLogin, actionLogin, actionLogout } = require('./auth/controller');
const { isAdminLogin } = require('../../middlewares/auth');

const router = require('express').Router();

// ADMIN AUTH ROUTER
router.get('/login', viewLogin);
router.post('/login', actionLogin);
router.get('/logout', actionLogout);

// DASHBOARD ROUTER
router.get('/', isAdminLogin, dashboard);

// CREATORS ROUTER
router.get('/creators', isAdminLogin, getAllCreators);
router.get('/creators/edit/:id_creator', isAdminLogin, viewEditCreator);
router.put(
  '/creators/edit/:id_creator',
  isAdminLogin,
  multer({ dest: os.tmpdir() }).single('thumbnail'),
  actionEditCreator,
);

// CONTENTS ROUTER
router.get('/contents', isAdminLogin, getAllContents);
router.get('/contents/edit/:id_content', isAdminLogin, viewEditContent);
router.put(
  '/contents/edit/:id_content',
  isAdminLogin,
  multer({ dest: os.tmpdir() }).single('thumbnail'),
  actionEditContent,
);
router.delete('/contents/delete/:id_content', actionDeleteContent);

// VOUCHERS ROUTER
router.get('/vouchers', isAdminLogin, getAllVouchers);
router.get('/vouchers/add', isAdminLogin, viewCreateVoucher);
router.post('/vouchers/add', isAdminLogin, actionCreateVoucher);
router.get('/vouchers/edit/:id_voucher', isAdminLogin, viewEditVoucher);
router.put('/vouchers/edit/:id_voucher', isAdminLogin, actionEditVoucher);
router.delete('/vouchers/delete/:id_voucher', isAdminLogin, actionDeleteVoucher);

// TRANSACTIONS ROUTER
router.get('/transactions', isAdminLogin, getAllTransactions);
router.put('/transactions/join/:id_transaction?', isAdminLogin, actionStatus);

module.exports = router;
