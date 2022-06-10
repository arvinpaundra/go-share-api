const { isCreatorLogin } = require('../../../../middlewares/auth');
const { subscriptionStatus } = require('../../../../middlewares/subscription');
const { getDataCreator } = require('../controller');

const router = require('express').Router();

router.get('/:id_creator', isCreatorLogin, subscriptionStatus, getDataCreator);

module.exports = router;
