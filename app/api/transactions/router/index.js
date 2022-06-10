const { isCreatorLogin } = require('../../../../middlewares/auth');
const { addNewTransaction } = require('../controller');

const router = require('express').Router();
const multer = require('multer');
const os = require('os');

router.post(
  '/',
  isCreatorLogin,
  multer({ dest: os.tmpdir() }).single('transaction_evidence'),
  addNewTransaction,
);

module.exports = router;
