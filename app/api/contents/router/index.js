const { isCreatorLogin } = require('../../../../middlewares/auth');
const { subscriptionStatus } = require('../../../../middlewares/subscription');
const {
  getContents,
  postContent,
  editContent,
  getAllContents,
  deleteContent,
  getDetailContent,
} = require('../controller');
const multer = require('multer');
const os = require('os');

const router = require('express').Router();

router.get('/all', isCreatorLogin, subscriptionStatus, getAllContents);
router.get('/all/:id_creator', isCreatorLogin, subscriptionStatus, getContents);
router.post(
  '/',
  isCreatorLogin,
  subscriptionStatus,
  multer({ dest: os.tmpdir() }).single('thumbnail'),
  postContent,
);
router.put('/:id_content', isCreatorLogin, subscriptionStatus, editContent);
router.get('/:id_content', isCreatorLogin, subscriptionStatus, getDetailContent);
router.delete('/:id_content', isCreatorLogin, subscriptionStatus, deleteContent);

module.exports = router;
