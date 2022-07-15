const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const config = require('../../../../config');
const {
  getDataCreatorDB,
  editDataProfileDB,
  editProfilePasswordDB,
  editProfilePictureDB,
} = require('./queries');

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
  editDataprofile: async (req, res) => {
    const { fullname, email } = req.body;
    const { id_creator } = req.params;

    if (!fullname || !email) {
      return res.status(400).json({ data: { message: 'Field cannot be empty.' } });
    }

    try {
      const creator = await getDataCreatorDB(id_creator);

      if (!creator) {
        return res.status(404).json({ data: { message: 'Creator is not registered.' } });
      }

      await editDataProfileDB(fullname, email, creator.id_creator);

      return res
        .status(201)
        .json({ data: { message: 'Yeay, your profile has been updated successfully!' } });
    } catch (error) {
      return res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
  editProfilePicture: async (req, res) => {
    const { id_creator } = req.params;

    if (req.file) {
      try {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let filename = `${req.file.filename}.${originalExt}`;
        let target_path = path.resolve(config.rootPath, `public/uploads/profiles/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const creator = await getDataCreatorDB(id_creator);

            if (!creator) {
              return res.status(404).json({ data: { message: 'Creator is not registered.' } });
            }

            let currentImage = `${config.rootPath}/public/uploads/profiles/${creator.thumbnail}`;

            if (fs.existsSync(currentImage) && creator.thumbnail !== 'pp-fallback.jpg') {
              fs.unlink(currentImage, (err) => {
                if (err) throw err;
              });
            }

            await editProfilePictureDB(filename, creator.id_creator);

            return res.status(201).json({
              data: { message: 'Yeay, your profile picture has been updated sucessfully.' },
            });
          } catch (error) {
            return res.status(500).json({ data: { message: 'Internal server error.' } });
          }
        });
      } catch (error) {
        return res.status(500).json({ data: { message: 'Internal server error.' } });
      }
    }
  },
  editProfilePassword: async (req, res) => {
    const { password1, password2 } = req.body;
    const { id_creator } = req.params;

    if (!password1 || !password2) {
      return res.status(400).json({ data: { message: 'Both password cannot be empty.' } });
    } else if (password1 !== password2) {
      return res.status(400).json({ data: { message: 'Password is not match. Try again!' } });
    }

    try {
      const creator = await getDataCreatorDB(id_creator);

      if (!creator) {
        return res.status(404).json({ data: { message: 'Creator is not registered.' } });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password2, salt);

      await editProfilePasswordDB(hash, creator.id_creator);

      return res
        .status(201)
        .json({ data: { message: 'Yeay, your password has been updated successfully.' } });
    } catch (error) {
      return res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
};
