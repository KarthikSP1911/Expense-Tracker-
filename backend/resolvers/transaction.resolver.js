import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transactionResolver = {
	Query: {
		transactions: async (_, __, context) => {
			try {
				// Get user from context (set in backend/index.js)
				const user = context.user || (await context.getUser());
				if (!user) throw new Error("Unauthorized");
				const userId = user._id;

				const transactions = await Transaction.find({ userId });
				return transactions;
			} catch (err) {
				console.error("Error getting transactions:", err);
				throw new Error(err.message || "Error getting transactions");
			}
		},
		transaction: async (_, { transactionId }, context) => {
			try {
				const user = context.user || (await context.getUser());
				if (!user) throw new Error("Unauthorized");
				const transaction = await Transaction.findById(transactionId);
				if (!transaction) throw new Error("Transaction not found");
				if (transaction.userId.toString() !== user._id.toString()) {
					throw new Error("Unauthorized");
				}
				return transaction;
			} catch (err) {
				console.error("Error getting transaction:", err);
				throw new Error(err.message || "Error getting transaction");
			}
		},
		categoryStatistics: async (_, __, context) => {
			const user = context.user || (await context.getUser());
			if (!user) throw new Error("Unauthorized");

			const userId = user._id;
			const transactions = await Transaction.find({ userId });
			const categoryMap = {};

			transactions.forEach((transaction) => {
				if (!categoryMap[transaction.category]) {
					categoryMap[transaction.category] = 0;
				}
				categoryMap[transaction.category] += transaction.amount;
			});

			return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }));
		},
	},
	Mutation: {
		createTransaction: async (_, { input }, context) => {
			try {
				const user = context.user || (await context.getUser());
				if (!user) throw new Error("Unauthorized");
				const newTransaction = new Transaction({
					...input,
					userId: user._id,
				});
				await newTransaction.save();
				return newTransaction;
			} catch (err) {
				console.error("Error creating transaction:", err);
				throw new Error(err.message || "Error creating transaction");
			}
		},
		updateTransaction: async (_, { input }, context) => {
			try {
				const user = context.user || (await context.getUser());
				if (!user) throw new Error("Unauthorized");
				const transaction = await Transaction.findById(input.transactionId);
				if (!transaction) throw new Error("Transaction not found");
				if (transaction.userId.toString() !== user._id.toString()) {
					throw new Error("Unauthorized");
				}
				const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {
					new: true,
				});
				return updatedTransaction;
			} catch (err) {
				console.error("Error updating transaction:", err);
				throw new Error(err.message || "Error updating transaction");
			}
		},
		deleteTransaction: async (_, { transactionId }, context) => {
			try {
				const user = context.user || (await context.getUser());
				if (!user) throw new Error("Unauthorized");
				const transaction = await Transaction.findById(transactionId);
				if (!transaction) throw new Error("Transaction not found");
				if (transaction.userId.toString() !== user._id.toString()) {
					throw new Error("Unauthorized");
				}
				const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
				return deletedTransaction;
			} catch (err) {
				console.error("Error deleting transaction:", err);
				throw new Error(err.message || "Error deleting transaction");
			}
		},
	},
	Transaction: {
		user: async (parent) => {
			const userId = parent.userId;
			try {
				const user = await User.findById(userId);
				return user;
			} catch (err) {
				console.error("Error getting user:", err);
				throw new Error("Error getting user");
			}
		},
	},
};

export default transactionResolver;
