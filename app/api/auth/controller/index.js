const bcrypt = require('bcryptjs');
const { getCreatorByEmailDB, insertCreatorDB } = require('./queries');
const jwt = require('jsonwebtoken');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const creator = await getCreatorByEmailDB(email);

      if (!creator) {
        return res
          .status(409)
          .json({ data: { message: 'Oops, your email or password are incorrect.' } });
      }

      const checkPassword = bcrypt.compareSync(password, creator.password);

      if (!checkPassword) {
        return res
          .status(409)
          .json({ data: { message: 'Oops, your email or password are incorrect.' } });
      }

      const token = jwt.sign(
        {
          creator: {
            id_creator: creator.id_creator,
            fullname: creator.fullname,
            email: creator.email,
            status: creator.status,
            thumbnail: creator.thumbnail,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
      );

      return res.status(200).json({
        data: {
          message: 'Yeay, Login is successful!',
          token,
        },
      });
    } catch (error) {
      res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
  register: async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
      const checkEmail = await getCreatorByEmailDB(email);

      if (checkEmail) {
        return res.status(409).json({ data: { message: 'Oops, email is already used!' } });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      await insertCreatorDB(fullname, email, hash);

      return res.status(201).json({ data: { message: 'Yeay, register successful!' } });
    } catch (error) {
      res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
};
