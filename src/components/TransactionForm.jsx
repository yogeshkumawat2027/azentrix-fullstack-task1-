import { useState } from "react";
import {
  addTransaction,
  getTransactions,
} from "../services/transactionService";

function TransactionForm({
  setTransactions,
}) {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addTransaction({
      ...formData,
      amount: Number(formData.amount),
    });

    setTransactions(getTransactions());

    setFormData({
      type: "expense",
      amount: "",
      category: "",
      date: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={formData.type}
        onChange={(e) =>
          setFormData({
            ...formData,
            type: e.target.value,
          })
        }
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) =>
          setFormData({
            ...formData,
            amount: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) =>
          setFormData({
            ...formData,
            category: e.target.value,
          })
        }
      />

      <input
        type="date"
        value={formData.date}
        onChange={(e) =>
          setFormData({
            ...formData,
            date: e.target.value,
          })
        }
      />

      <button type="submit">
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;