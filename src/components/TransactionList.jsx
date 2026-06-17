import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import { deleteTransaction, getTransactions } from "../services/transactionService";
import "./TransactionList.css";

function Icon({ name }) {
  if (name === "edit") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    );
  }

  if (name === "trash") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const getDescription = (description) => {
  if (!description) {
    return "No description";
  }

  return description.length > 34 ? `${description.slice(0, 34)}...more` : description;
};

function TransactionList({
  transactions,
  setTransactions,
  setSelectedTransaction,
  onAddClick,
}) {
  const [activeFilter, setActiveFilter] = useState("recent");

  const sortedTransactions = useMemo(
    () =>
      [...transactions].sort(
        (first, second) => new Date(second.date) - new Date(first.date)
      ),
    [transactions]
  );

  const visibleTransactions =
    activeFilter === "recent" ? sortedTransactions.slice(0, 5) : sortedTransactions;

  const handleDelete = (id) => {
    deleteTransaction(id);
    setTransactions(getTransactions());
    toast.success("Transaction deleted successfully");
  };

  return (
    <section className="transaction-list-container">
      <div className="transaction-list-header">
        <div>
          <h2>Transactions</h2>
          <p>{activeFilter === "recent" ? "Latest 5 entries" : "All activity"}</p>
        </div>

        <button className="mobile-add-btn" type="button" onClick={onAddClick}>
          <Icon name="add" />
          <span>Add</span>
        </button>

        <div className="filter-buttons" aria-label="Transaction filter">
          <button
            className={activeFilter === "recent" ? "active" : ""}
            type="button"
            onClick={() => setActiveFilter("recent")}
          >
            Recent
          </button>

          <button
            className={activeFilter === "all" ? "active" : ""}
            type="button"
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
        </div>
      </div>

      {visibleTransactions.length === 0 ? (
        <div className="empty-state">
          <h3>No Transactions Found</h3>
          <p>Add your first income or expense transaction.</p>
        </div>
      ) : (
        <div className="transaction-card-list">
          {visibleTransactions.map((transaction) => (
            <article className="transaction-card" key={transaction.id}>
              <div className="transaction-card-main">
                <span className={`category-dot ${transaction.type}`} aria-hidden="true" />

                <div className="transaction-info">
                  <div className="transaction-title-row">
                    <h3>{transaction.category}</h3>
                    <strong
                      className={`amount ${
                        transaction.type === "income"
                          ? "income-amount"
                          : "expense-amount"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}₹
                      {Number(transaction.amount).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="transaction-meta">
                    <span>{formatDate(transaction.date)}</span>
                    <span className="description-text">
                      {getDescription(transaction.description)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <button
                  className="icon-btn edit-btn"
                  type="button"
                  aria-label={`Edit ${transaction.category} transaction`}
                  onClick={() => setSelectedTransaction(transaction)}
                  title="Edit"
                >
                  <Icon name="edit" />
                </button>

                <button
                  className="icon-btn delete-btn"
                  type="button"
                  aria-label={`Delete ${transaction.category} transaction`}
                  onClick={() => handleDelete(transaction.id)}
                  title="Delete"
                >
                  <Icon name="trash" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default TransactionList;
