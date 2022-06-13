const {
  addNewVoucherDB,
  getAllVouchersDB,
  getVoucherByIdDB,
  editVoucherByIdDB,
  deleteVoucherByIdDB,
} = require('./queries');

module.exports = {
  getAllVouchers: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const vouchers = await getAllVouchersDB();

      return res.render('admin/vouchers/index', {
        title: 'Vouchers Page',
        vouchers,
        alert,
        active: 'vouchers',
      });
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin');
    }
  },
  viewCreateVoucher: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      return res.render('admin/vouchers/add', {
        title: 'Add Voucher Page',
        alert,
        active: 'vouchers',
      });
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin/vouchers');
    }
  },
  actionCreateVoucher: async (req, res) => {
    const { nominal_after } = req.body;

    try {
      if (nominal_after < 0) {
        req.flash('alertMessage', 'Fields can not be empty.');
        req.flash('alertStatus', 'danger');
        return res.redirect('/admin/vouchers/add');
      }

      await addNewVoucherDB(nominal_after);

      req.flash('alertMessage', 'Successfully added voucher.');
      req.flash('alertStatus', 'success');
      return res.redirect('/admin/vouchers');
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin/vouchers');
    }
  },
  viewEditVoucher: async (req, res) => {
    const { id_voucher } = req.params;

    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const voucher = await getVoucherByIdDB(id_voucher);

      return res.render('admin/vouchers/edit', {
        title: 'Edit Voucher Page',
        voucher,
        alert,
        active: 'vouchers',
      });
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin/vouchers');
    }
  },
  actionEditVoucher: async (req, res) => {
    const { nominal_before, nominal_after } = req.body;
    const { id_voucher } = req.params;

    try {
      if (nominal_before < 0 || nominal_after < 0) {
        req.flash('alertMessage', 'Invalid input.');
        req.flash('alertStatus', 'danger');
        return res.redirect(`/admin/vouchers/edit/${id_voucher}`);
      }

      await editVoucherByIdDB(id_voucher, nominal_before, nominal_after);

      req.flash('alertMessage', 'Successfully edit voucher.');
      req.flash('alertStatus', 'success');
      return res.redirect('/admin/vouchers');
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin/vouchers');
    }
  },
  actionDeleteVoucher: async (req, res) => {
    const { id_voucher } = req.params;

    try {
      await deleteVoucherByIdDB(id_voucher);

      req.flash('alertMessage', 'Successfully delete voucher.');
      req.flash('alertStatus', 'success');
      return res.redirect('/admin/vouchers');
    } catch (error) {
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin/vouchers');
    }
  },
};
