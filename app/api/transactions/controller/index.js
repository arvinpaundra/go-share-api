const { addNewTransactionDB } = require('./queries');
const path = require('path');
const fs = require('fs');
const { rootPath } = require('../../../../config');

module.exports = {
  addNewTransaction: async (req, res) => {
    const { id_creator, nominal, payment_method } = req.body;

    try {
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let filename = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(rootPath, `public/uploads/transactions/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            await addNewTransactionDB(id_creator, nominal, filename, payment_method);

            return res.status(201).json({
              data: {
                message: 'Your subscription is complete. Our admins are currently processing.',
              },
            });
          } catch (error) {
            console.log(error);
          }
        });
      }
    } catch (error) {
      return res.status(500).json({ data: { message: 'Interal server error.' } });
    }
  },
};
