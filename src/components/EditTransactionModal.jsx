import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  updateTransaction,
  getTransactions,
} from "../services/transactionService";

import "./EditTransactionModal.css";

function EditTransactionModal({
  selectedTransaction,
  setSelectedTransaction,
  setTransactions,
}) {
  const expenseCategories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "HealthCare",
    "Education",
    "Other",
  ];

  const incomeSources = [
    "Salary",
    "Business",
    "Freelancing",
    "Other",
  ];

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (selectedTransaction) {
      setFormData(selectedTransaction);
    }
  }, [selectedTransaction]);

  if (!selectedTransaction || !formData) {
    return null;
  }

  const options =
    formData.type === "expense"
      ? expenseCategories
      : incomeSources;

  const handleSubmit = (e) => {
    e.preventDefault();

    updateTransaction(
      selectedTransaction.id,
      {
        ...formData,
        amount: Number(formData.amount),
      }
    );

    setTransactions(getTransactions());

    toast.success(
      "Transaction updated successfully"
    );

    setSelectedTransaction(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Edit Transaction</h2>

          <button
            className="close-btn"
            onClick={() =>
              setSelectedTransaction(null)
            }
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Type</label>

            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value,
                  category:
                    e.target.value === "expense"
                      ? expenseCategories[0]
                      : incomeSources[0],
                })
              }
            >
              <option value="expense">
                Expense
              </option>

              <option value="income">
                Income
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Amount</label>

            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>
              {formData.type === "expense"
                ? "Category"
                : "Income Source"}
            </label>

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
            >
              {options.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description:
                    e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="save-btn"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTransactionModal;