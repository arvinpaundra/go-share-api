const { getAllCreatorsDB, getCreatorByIdDB, editCreatorByIdDB } = require('./queries');
const path = require('path');
const fs = require('fs');
const { rootPath } = require('../../../../config');

module.exports = {
  getAllCreators: async (req, res) => {
    try {
      const alertStatus = req.flash('alertStatus');
      const alertMessage = req.flash('alertMessage');
      const alert = { message: alertMessage, status: alertStatus };

      const creators = await getAllCreatorsDB();

      return res.render('admin/creators/index', {
        creators,
        alert,
        title: 'Creators Page',
        active: 'creators',
      });
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin');
    }
  },
  viewEditCreator: async (req, res) => {
    const { id_creator } = req.params;

    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const creator = await getCreatorByIdDB(id_creator);

      return res.render('admin/creators/edit', {
        title: 'Edit Data Creator',
        alert,
        creator,
        active: 'creators',
      });
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin/creators');
    }
  },
  actionEditCreator: async (req, res) => {
    const { fullname, email, status } = req.body;
    const { id_creator } = req.params;

    try {
      if (!fullname || !email || !status || !req.file) {
        req.flash('alertMessage', 'Field can not be empty.');
        req.flash('alertStatus', 'danger');
        return res.redirect(`/admin/creators/edit/${id_creator}`);
      }

      if (req.file) {
        let temp_path = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let filename = `${req.file.filename}.${originalExt}`;
        let target_path = path.resolve(rootPath, `public/uploads/${filename}`);

        const src = fs.createReadStream(temp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const creator = await getCreatorByIdDB(id_creator);

            let currentImage = `${rootPath}/public/uploads/profile/${creator.thumbnail}`;
            if (fs.existsSync(currentImage)) {
              fs.unlink(currentImage, (error) => {
                if (error) throw error;
              });
            }

            await editCreatorByIdDB(id_creator, fullname, email, status, filename);

            req.flash('alertMessage', 'Successfully update creator.');
            req.flash('alertStatus', 'success');
            return res.redirect('/admin/creators');
          } catch (error) {
            req.flash('alertMessage', 'Internal server error');
            req.flash('alertStatus', 'danger');
            return res.redirect('/admin/creators');
          }
        });
      }
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin/creators');
    }
  },
};
