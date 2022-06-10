const { isCreatorLogin } = require('../../../../middlewares/auth');
const { subscriptionStatus } = require('../../../../middlewares/subscription');
const {
  getWatchPoint,
  updateWatchPoint,
  getSeenPoint,
  updateSeenPoint,
  getRemainingPoint,
} = require('../controller');

const router = require('express').Router();

router.get('/watch/:id_creator', isCreatorLogin, subscriptionStatus, getWatchPoint);
router.put('/watch/:id_creator', isCreatorLogin, subscriptionStatus, updateWatchPoint);
router.get('/seen/:id_creator', isCreatorLogin, subscriptionStatus, getSeenPoint);
router.put('/seen/:id_creator', isCreatorLogin, subscriptionStatus, updateSeenPoint);
router.get('/remaining/:id_creator', isCreatorLogin, subscriptionStatus, getRemainingPoint);

module.exports = router;
