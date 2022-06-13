const jwt = require('jsonwebtoken');
const { getStatusSubscription } = require('./queries');

module.exports = {
  isAdminLogin: async (req, res, next) => {
    try {
      if (req.session.user === undefined || req.session.user === null) {
        req.flash('alertMessage', 'Your session has ended! Please login again.');
        req.flash('alertStatus', 'danger');
        return res.redirect('/admin/login');
      } else {
        next();
      }
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin/login');
    }
  },
  isCreatorLogin: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace('Bearer ', '')
        : null;

      const creator = jwt.verify(token, process.env.JWT_SECRET);

      const status = await getStatusSubscription(creator.creator.id_creator);

      if (!creator) {
        throw new Error();
      }

      req.status = status;

      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },
};
