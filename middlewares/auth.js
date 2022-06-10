const jwt = require('jsonwebtoken');
const { getStatusSubscription } = require('./queries');

module.exports = {
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
