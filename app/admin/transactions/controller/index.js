const { getAllTransactionsDB, renewStatusJoinDB, updateTransactionStatus } = require('./queries');

module.exports = {
  getAllTransactions: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const transactions = await getAllTransactionsDB();

      return res.render('admin/transactions/index', {
        title: 'Transactions Page',
        transactions,
        alert,
        active: 'transactions',
      });
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin');
    }
  },
  actionStatus: async (req, res) => {
    const { id_transaction } = req.params;
    const { status, id_creator } = req.query;

    try {
      const joinDate = new Date();
      const expDate = new Date(joinDate);
      expDate.setMonth(joinDate.getMonth() + 1);

      if (status === 'success') {
        await renewStatusJoinDB(id_creator, joinDate, expDate, 'Y');
        await updateTransactionStatus(id_transaction, status);
        req.flash('alertMessage', 'Transaction accepted!');
        req.flash('alertStatus', 'success');
      } else if (status === 'denied') {
        await renewStatusJoinDB(id_creator, joinDate, expDate, 'N');
        await updateTransactionStatus(id_transaction, status);
        req.flash('alertMessage', 'Transaction denied!');
        req.flash('alertStatus', 'danger');
      }

      return res.redirect('/admin/transactions');
    } catch (error) {
      console.log(error);
      req.flash('alertMessage', 'Internal server error.');
      req.flash('alertStatus', 'danger');
      return res.redirect('/admin/transactions');
    }
  },
};
