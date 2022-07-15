const multer = require('multer');
const os = require('os');
const { isCreatorLogin } = require('../../../../middlewares/auth');
const { subscriptionStatus } = require('../../../../middlewares/subscription');
const {
  getDataCreator,
  editDataprofile,
  editProfilePicture,
  editProfilePassword,
} = require('../controller');

const router = require('express').Router();

router.get('/:id_creator', isCreatorLogin, subscriptionStatus, getDataCreator);
router.put('/:id_creator/edit', isCreatorLogin, subscriptionStatus, editDataprofile);
router.put(
  '/:id_creator/profile-picture',
  isCreatorLogin,
  subscriptionStatus,
  multer({ dest: os.tmpdir() }).single('thumbnail'),
  editProfilePicture,
);
router.put('/:id_creator/edit-password', isCreatorLogin, subscriptionStatus, editProfilePassword);

module.exports = router;
