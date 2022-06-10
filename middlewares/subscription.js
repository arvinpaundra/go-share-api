const { resetStatus } = require('./queries');

module.exports = {
  subscriptionStatus: async (req, res, next) => {
    const { status, expired_date, id_creator } = req.status;

    try {
      const exp_date = new Date(expired_date).toLocaleDateString();

      const curr_date = new Date().toLocaleDateString();

      if (exp_date === curr_date || expired_date === null) {
        await resetStatus(id_creator);
      }
    } catch (error) {}

    next();
  },
};
