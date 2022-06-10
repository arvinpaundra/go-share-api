const { isCreatorLogin } = require('../../../../middlewares/auth');
const { addNewVoucher, getVouchers } = require('../controller');

const router = require('express').Router();

router.post('/', addNewVoucher);
router.get('/', isCreatorLogin, getVouchers);

module.exports = router;
