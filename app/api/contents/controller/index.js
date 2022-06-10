const {
  getContentsCreatorDB,
  postContentCreatorDB,
  getContentByIdDB,
  editContentCreatorDB,
  getAllContentsDB,
  deleteContentCreatorDB,
  getDetailContentDB,
} = require('./queries');

module.exports = {
  getAllContents: async (req, res) => {
    try {
      const contents = await getAllContentsDB();

      if (!contents) {
        return res
          .status(404)
          .json({ data: { message: 'Oops, there are no contents down here.' } });
      }

      return res.status(200).json({ data: { message: 'success', result: contents } });
    } catch (error) {
      return res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
  getDetailContent: async (req, res) => {
    const { id_content } = req.params;

    try {
      const content = await getDetailContentDB(id_content);

      if (!content) {
        return res.status(404).json({ data: { message: "Content doesn't exist." } });
      }

      return res.status(200).json({ data: { message: 'success', result: content } });
    } catch (error) {
      return res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
  getContents: async (req, res) => {
    const { id_creator } = req.params;

    try {
      const contents = await getContentsCreatorDB(id_creator);

      if (!contents.length) {
        return res.status(404).json({ data: { message: "You haven't post anything yet." } });
      }

      return res.status(200).json({ data: { message: 'success', result: contents } });
    } catch (error) {
      return res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
  postContent: async (req, res) => {
    const { title, url, thumbnail, id_creator } = req.body;

    try {
      await postContentCreatorDB(title, url, thumbnail, id_creator);

      return res.status(201).json({ data: { message: 'Upload content successful.' } });
    } catch (error) {
      return res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
  editContent: async (req, res) => {
    const { title, url } = req.body;
    const { id_content } = req.params;

    try {
      const findContent = await getContentByIdDB(id_content);

      if (!findContent) {
        return res.status(404).json({ data: { message: 'Not found' } });
      }

      await editContentCreatorDB(title, url, thumbnail, id_content);

      return res
        .status(201)
        .json({ data: { message: 'Yeay, your content has been updated successfully!' } });
    } catch (error) {
      res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
  deleteContent: async (req, res) => {
    const { id_content } = req.body;

    try {
      const content = await getContentByIdDB(id_content);

      if (!content) {
        return res.status(404).json({ data: { message: 'Content is not exist.' } });
      }

      await deleteContentCreatorDB(id_content);

      return res
        .status(200)
        .json({ data: { message: 'Your content has been deleted successfully!' } });
    } catch (error) {
      return res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
};
