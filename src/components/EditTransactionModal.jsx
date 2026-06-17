import { useState } from "react";
import { toast } from "react-toastify";

import { getTransactions, updateTransaction } from "../services/transactionService";
import "./EditTransactionModal.css";

const expenseCategories = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Healthcare",
  "Education",
  "Other",
];

const incomeCategories = ["Salary", "Business", "Freelancing", "Investment", "Other"];

function EditTransactionForm({
  initialTransaction,
  setSelectedTransaction,
  setTransactions,
}) {
  const [formData, setFormData] = useState(initialTransaction);
  const options = formData.type === "expense" ? expenseCategories : incomeCategories;

  const handleSubmit = (event) => {
    event.preventDefault();

    updateTransaction(initialTransaction.id, {
      ...formData,
      amount: Number(formData.amount),
    });

    setTransactions(getTransactions());
    toast.success("Transaction updated successfully");
    setSelectedTransaction(null);
  };

  return (
    <div className="modal-container">
      <div className="modal-header">
        <h2>Edit Transaction</h2>

        <button
          className="close-btn"
          type="button"
          aria-label="Close edit transaction modal"
          onClick={() => setSelectedTransaction(null)}
        >
          X
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="edit-type-toggle" aria-label="Transaction type">
          <button
            className={formData.type === "income" ? "active income" : ""}
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                type: "income",
                category: incomeCategories[0],
              })
            }
          >
            Income
          </button>

          <button
            className={formData.type === "expense" ? "active expense" : ""}
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                type: "expense",
                category: expenseCategories[0],
              })
            }
          >
            Expense
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="edit-transaction-amount">Amount</label>

          <div className="edit-amount-input">
            <span aria-hidden="true">{"\u20B9"}</span>
            <input
              id="edit-transaction-amount"
              type="number"
              min="1"
              value={formData.amount}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  amount: event.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="edit-transaction-category">
            {formData.type === "expense" ? "Category" : "Income Source"}
          </label>

          <select
            id="edit-transaction-category"
            value={formData.category}
            onChange={(event) =>
              setFormData({
                ...formData,
                category: event.target.value,
              })
            }
          >
            {options.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="edit-transaction-date">Date</label>

          <input
            id="edit-transaction-date"
            type="date"
            value={new Date(formData.date).toISOString().slice(0, 10)}
            onChange={(event) =>
              setFormData({
                ...formData,
                date: new Date(`${event.target.value}T12:00:00`).toISOString(),
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-transaction-description">Description</label>

          <textarea
            id="edit-transaction-description"
            rows="3"
            value={formData.description}
            onChange={(event) =>
              setFormData({
                ...formData,
                description: event.target.value,
              })
            }
          />
        </div>

        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}

function EditTransactionModal({
  selectedTransaction,
  setSelectedTransaction,
  setTransactions,
}) {
  if (!selectedTransaction) {
    return null;
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <EditTransactionForm
        key={selectedTransaction.id}
        initialTransaction={selectedTransaction}
        setSelectedTransaction={setSelectedTransaction}
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default EditTransactionModal;
