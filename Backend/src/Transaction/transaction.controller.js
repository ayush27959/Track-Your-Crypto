import mongoose from "mongoose";
import TransactionModel from "./transaction.modal.js";

// 1. Get Report Controller (Aggregation Pipelines)
export const getReport = async (req, res) => {
  try {
    const { id, role } = req.user;

    const userObjectId = new mongoose.Types.ObjectId(id);
    const matchStage = role === "admin" ? {} : { userId: userObjectId };

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const [summaryResult, dailyResult] = await Promise.all([
      TransactionModel.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: null,
            totalTransaction: { $sum: 1 },
            totalBuy: {
              $sum: {
                $cond: [{ $eq: ["$transactionType", "buy"] }, "$amount", 0],
              },
            },
            totalSell: {
              $sum: {
                $cond: [{ $eq: ["$transactionType", "sell"] }, "$amount", 0],
              },
            },
          },
        },
      ]),
      TransactionModel.aggregate([
        {
          $match: {
            ...matchStage,
            createdAt: { $gte: thirtyDaysAgo },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            total: { $sum: "$amount" },
          },
        },
      ]),
    ]);

    const summaryData = summaryResult[0] || {
      totalTransaction: 0,
      totalBuy: 0,
      totalSell: 0,
    };

    const totalTransaction = summaryData.totalTransaction;
    const totalCredit = summaryData.totalBuy;
    const totalDebit = summaryData.totalSell;
    const balance = totalCredit - totalDebit;

    const estimate = (value) => Math.floor(value + value * 0.15);

    const dailyMap = {};
    dailyResult.forEach((item) => {
      dailyMap[item._id] = item.total;
    });

    const today = new Date();
    const last30Days = Array.from({ length: 30 }, (_, index) => {
      const i = 29 - index;
      const d = new Date(today);
      d.setDate(today.getDate() - i);

      const dateStr = d.toISOString().slice(0, 10);
      return {
        date: dateStr,
        total: dailyMap[dateStr] || 0,
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

// 2. Create Transaction
export const createTransaction = async (req, res) => {
  try {
    const transaction = await TransactionModel.create({
      ...req.body,
      userId: req.user.id,
    });
    return res.status(201).json({ success: true, data: transaction });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 3. Get All Transactions
export const getTransactions = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { userId: req.user.id };
    const transactions = await TransactionModel.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: transactions });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 4. Update Transaction
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await TransactionModel.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 5. Delete Transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await TransactionModel.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Transaction deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};