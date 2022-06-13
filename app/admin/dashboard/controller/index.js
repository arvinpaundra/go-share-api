const {
  getTotalUsersDB,
  getActiveMembersDB,
  getTotalContentsDB,
  getTotalVouchersDB,
} = require('./queries');

module.exports = {
  dashboard: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const users = await getTotalUsersDB();
      const members = await getActiveMembersDB();
      const contents = await getTotalContentsDB();
      const vouchers = await getTotalVouchersDB();

      res.render('admin/dashboard/index', {
        title: 'Dashboard Admin GoShare',
        active: 'dashboard',
        users: users.user,
        members: members.member,
        contents: contents.content,
        vouchers: vouchers.voucher,
        alert,
      });
    } catch (error) {}
  },
};
