import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TransactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Index for single field lookups
    },
    transactionType: {
      type: String, // "buy" or "sell"
      enum: ["buy", "sell"],
      trim: true,
      required: true,
      lowercase: true,
    },
    coinName: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    symbol: {
      type: String,
      trim: true,
      required: true,
      uppercase: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount cannot be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"],
    },
    buyPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

// 🚀 INDEXES FOR FAST AGGREGATION & REPORTING
// 1. Optimizes filtering transactions by user and sorting/grouping by creation date
TransactionSchema.index({ userId: 1, createdAt: -1 });

// 2. Optimizes filtering by user and transaction type (buy/sell)
TransactionSchema.index({ userId: 1, transactionType: 1 });

const TransactionModel = model("Transaction", TransactionSchema);

export default TransactionModel;