const {
  getAllContentsDB,
  getContentByIdDB,
  editContentByIdDB,
  deleteContentByIdDB,
} = require('./queries');
const fs = require('fs');
const config = require('../../../../config');

module.exports = {
  getAllContents: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const contents = await getAllContentsDB();

      return res.render('admin/contents/index', {
        title: 'Contents Page',
        contents,
        alert,
        active: 'contents',
      });
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin');
    }
  },
  viewEditContent: async (req, res) => {
    const { id_content } = req.params;

    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const content = await getContentByIdDB(id_content);

      return res.render('admin/contents/edit', {
        title: 'Edit Content Page',
        content,
        alert,
        active: 'contents',
      });
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin/contents');
    }
  },
  actionEditContent: async (req, res) => {
    const { title, url } = req.body;
    const { id_content } = req.params;

    try {
      if (!title || !url) {
        req.flash('alertMessage', 'Fields can not be empty.');
        req.flash('alertStatus', 'danger');
        return res.redirect(`/admin/contents/edit/${id_content}`);
      }

      await editContentByIdDB(id_content, title, url);

      req.flash('alertMessage', 'Successfully update content.');
      req.flash('alertStatus', 'success');
      return res.redirect('/admin/contents');
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin/contents');
    }
  },
  actionDeleteContent: async (req, res) => {
    const { id_content } = req.params;

    try {
      const content = await getContentByIdDB(id_content);

      if (!content) {
        req.flash('alertMessage', 'Internal server error.');
        req.flash('alertStatus', 'danger');
        return res.redirect('/admin/contents');
      }

      const currentImage = `${config.rootPath}/public/uploads/thumbnail/${content.thumbnail}`;

      if (fs.existsSync(currentImage)) {
        fs.unlink(currentImage, (err) => {
          if (err) throw err;
        });
      }

      await deleteContentByIdDB(id_content);

      req.flash('alertMessage', 'Successfully delete content.');
      req.flash('alertStatus', 'success');
      return res.redirect('/admin/contents');
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin/contents');
    }
  },
};
