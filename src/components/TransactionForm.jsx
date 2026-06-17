import { useState } from "react";
import { toast } from "react-toastify";

import { addTransaction, getTransactions } from "../services/transactionService";
import "./TransactionForm.css";

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

const getToday = () => new Date().toISOString().slice(0, 10);

function TransactionForm({ setTransactions, onTransactionAdded }) {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: expenseCategories[0],
    description: "",
    date: getToday(),
  });

  const options = formData.type === "expense" ? expenseCategories : incomeCategories;

  const handleTypeChange = (type) => {
    setFormData((currentData) => ({
      ...currentData,
      type,
      category: type === "expense" ? expenseCategories[0] : incomeCategories[0],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.amount || Number(formData.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    addTransaction({
      ...formData,
      amount: Number(formData.amount),
      date: new Date(`${formData.date}T12:00:00`).toISOString(),
    });

    setTransactions(getTransactions());
    toast.success("Transaction added successfully");

    setFormData({
      type: "expense",
      amount: "",
      category: expenseCategories[0],
      description: "",
      date: getToday(),
    });

    onTransactionAdded?.();
  };

  return(
    <div className="transaction-form-container">
      <h2>Add Transaction</h2>

      <form className="transaction-form" onSubmit={handleSubmit}>
        <div className="type-toggle" aria-label="Transaction type">
          <button
            className={formData.type === "income" ? "active" : ""}
            type="button"
            onClick={() => handleTypeChange("income")}
          >
            Income
          </button>

          <button
            className={formData.type === "expense" ? "active" : ""}
            type="button"
            onClick={() => handleTypeChange("expense")}
          >
            Expense
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="transaction-amount">Amount</label>
          <div className="amount-input">
            <span aria-hidden="true">₹</span>
            <input
              id="transaction-amount"
              type="number"
              min="1"
              placeholder="0.00"
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
          <label htmlFor="transaction-category">
            {formData.type === "expense" ? "Category" : "Income Source"}
          </label>

          <select
            id="transaction-category"
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
          <label htmlFor="transaction-description">Description</label>
          <textarea
            id="transaction-description"
            rows="3"
            placeholder="Optional description"
            value={formData.description}
            onChange={(event) =>
              setFormData({
                ...formData,
                description: event.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="transaction-date">Date</label>
          <div className="date-input">
            <input
              id="transaction-date"
              type="date"
              value={formData.date}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  date: event.target.value,
                })
              }
            />
            <span aria-hidden="true">□</span>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
