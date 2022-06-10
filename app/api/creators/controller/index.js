const { getDataCreatorDB } = require('./queries');

module.exports = {
  getDataCreator: async (req, res) => {
    const { id_creator } = req.params;

    try {
      const creator = await getDataCreatorDB(id_creator);

      if (!creator) {
        return res.status(404).json({ data: { message: 'Creator is not registered.' } });
      }

      return res.status(200).json({ data: { message: 'success', result: creator } });
    } catch (error) {
      return res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
};
