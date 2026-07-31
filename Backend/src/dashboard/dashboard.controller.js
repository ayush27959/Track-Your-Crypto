import TransactionModel from "../Transaction/transaction.modal.js";

export const getReport = async (req, res) => {
  try {
    const { id, role } = req.user;

    // Filter records by user role
    const filter = role === "admin" ? {} : { userId: id };
    const transactions = await TransactionModel.find(filter).lean();

    let totalCredit = 0;
    let totalDebit = 0;
    const dailyMap = {};

    // Process transactions
    transactions.forEach((txn) => {
      const amount = Number(txn.amount) || 0;
      const type = (txn.transactionType || "").toLowerCase();

      // Check for both 'buy'/'cr' and 'sell'/'dr'
      if (type === "buy" || type === "cr" || type === "credit") {
        totalCredit += amount;
      } else if (type === "sell" || type === "dr" || type === "debit") {
        totalDebit += amount;
      }

      if (txn.createdAt) {
        const dateStr = new Date(txn.createdAt).toISOString().slice(0, 10);
        dailyMap[dateStr] = (dailyMap[dateStr] || 0) + amount;
      }
    });

    const totalTransaction = transactions.length;
    const balance = totalCredit - totalDebit;

    const estimate = (value) => Math.floor(value + value * 0.15);

    // Build 30-day timeline
    const today = new Date();
    const last30Days = Array.from({ length: 30 }, (_, index) => {
      const i = 29 - index;
      const d = new Date(today);
      d.setDate(today.getDate() - i);

      const dateSTR = d.toISOString().slice(0, 10);
      return {
        date: dateSTR,
        total: dailyMap[dateSTR] || 0,
      };
    });

    return res.status(200).json({
      summary: {
        totalTransaction,
        totalCredit,
        totalDebit,
        balance,
        totalTransactionEstimate: estimate(totalTransaction),
        totalCreditEstimate: estimate(totalCredit),
        totalDebitEstimate: estimate(totalDebit),
        balanceEstimate: estimate(balance),
      },
      chart: last30Days,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};