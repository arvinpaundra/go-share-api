const { getEmailAndPasswordAdminDB } = require('./queries');
const bcrypt = require('bcryptjs');

module.exports = {
  viewLogin: async (req, res) => {
    const { user } = req.session;
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      if (user === null || user === undefined) {
        return res.render('admin/auth/login', {
          title: 'Login Admin GoShare',
          alert,
        });
      } else {
        return res.redirect('/admin');
      }
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin/login');
    }
  },
  actionLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const admin = await getEmailAndPasswordAdminDB(email, password);

      if (!admin) {
        req.flash('alertMessage', 'Email or Password is incorrect.');
        req.flash('alertStatus', 'danger');
        return res.redirect('/admin/login');
      }

      const checkPassword = bcrypt.compareSync(password, admin.password);

      if (!checkPassword) {
        req.flash('alertMessage', 'Email or Password is incorrect.');
        req.flash('alertStatus', 'danger');
        return res.redirect('/admin/login');
      }

      req.session.user = {
        id: admin.fullname,
        name: admin.fullname,
        email: admin.email,
      };

      req.flash('alertMessage', 'Login successful.');
      req.flash('alertStatus', 'success');
      return res.redirect('/admin');
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin/login');
    }
  },
  actionLogout: (req, res) => {
    req.session.destroy((error) => {
      if (error) return res.redirect('/admin');

      res.clearCookie(process.env.SESSION_NAME);
      return res.redirect('/admin/login');
    });
  },
};
