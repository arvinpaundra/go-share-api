const {
  getWatchPointDB,
  updateWatchPointDB,
  getSeenPointDB,
  updateSeenPointDB,
  getRemainingPointDB,
  updateRemainingPointDB,
} = require('./queries');

module.exports = {
  getWatchPoint: async (req, res) => {
    const { id_creator } = req.params;

    try {
      const watch = await getWatchPointDB(id_creator);

      return res.status(200).json({ data: { message: 'success', result: watch } });
    } catch (error) {
      return res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
  updateWatchPoint: async (req, res) => {
    const { id_creator } = req.params;

    try {
      await updateWatchPointDB(id_creator);
      await updateRemainingPointDB(id_creator);

      return res.status(201).json({ data: { message: 'success' } });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
  getSeenPoint: async (req, res) => {
    const { id_creator } = req.params;

    try {
      const seen = await getSeenPointDB(id_creator);

      return res.status(200).json({ data: { message: 'success', result: seen } });
    } catch (error) {
      return res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
  updateSeenPoint: async (req, res) => {
    const { id_creator } = req.params;

    try {
      await updateSeenPointDB(id_creator);
      await updateRemainingPointDB(id_creator);

      return res.status(201).json({ data: { message: 'success' } });
    } catch (error) {
      return res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
  getRemainingPoint: async (req, res) => {
    const { id_creator } = req.params;

    try {
      const remaining = await getRemainingPointDB(id_creator);

      return res.status(200).json({ data: { message: 'success', result: remaining } });
    } catch (error) {
      return res.status(500).jsom({ data: { message: 'Internal server error.' } });
    }
  },
};
