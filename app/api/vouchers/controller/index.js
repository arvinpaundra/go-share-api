const { addNewVoucherDB, getVouchersDB } = require('./queries');

module.exports = {
  addNewVoucher: async (req, res) => {
    const { nominal_after } = req.body;

    try {
      await addNewVoucherDB(nominal_after);

      return res.status(201).json({ data: { message: 'New voucher has been added!' } });
    } catch (error) {
      return res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
  getVouchers: async (req, res) => {
    try {
      const vouchers = await getVouchersDB();

      return res.status(200).json({ data: { message: 'success', result: vouchers } });
    } catch (error) {
      return res.status(500).json({ data: { message: 'Internal server error.' } });
    }
  },
};
