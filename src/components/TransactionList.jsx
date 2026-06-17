import "./TransactionList.css";

import { toast } from "react-toastify";

import {
  deleteTransaction,
  getTransactions,
} from "../services/transactionService";

function TransactionList({
  transactions,
  setTransactions,
  setSelectedTransaction,
}) {
  const handleDelete = (id) => {
    deleteTransaction(id);

    setTransactions(getTransactions());

    toast.success(
      "Transaction deleted successfully"
    );
  };

  return (
    <div className="transaction-list-container">
      <div className="transaction-list-header">
        <h2>Transactions</h2>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <h3>No Transactions Found</h3>
          <p>
            Add your first income or expense
            transaction.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}

          <div className="table-wrapper">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map(
                  (transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        {new Date(
                          transaction.date
                        ).toLocaleDateString(
                          "en-IN"
                        )}
                      </td>

                      <td>
                        <span
                          className={`type-badge ${transaction.type}`}
                        >
                          {transaction.type}
                        </span>
                      </td>

                      <td>
                        {
                          transaction.category
                        }
                      </td>

                      <td>
                        {transaction.description ||
                          "-"}
                      </td>

                      <td
                        className={`amount ${
                          transaction.type ===
                          "income"
                            ? "income-amount"
                            : "expense-amount"
                        }`}
                      >
                        ₹
                        {Number(
                          transaction.amount
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-btn"
                            onClick={() =>
                              setSelectedTransaction(
                                transaction
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                transaction.id
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}

          <div className="mobile-cards">
            {transactions.map(
              (transaction) => (
                <div
                  className="transaction-card"
                  key={transaction.id}
                >
                  <div className="card-header">
                    <span
                      className={`type-badge ${transaction.type}`}
                    >
                      {transaction.type}
                    </span>

                    <strong
                      className={`amount ${
                        transaction.type ===
                        "income"
                          ? "income-amount"
                          : "expense-amount"
                      }`}
                    >
                      ₹
                      {Number(
                        transaction.amount
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>

                  <div className="card-body">
                    <p>
                      <strong>
                        Category:
                      </strong>{" "}
                      {
                        transaction.category
                      }
                    </p>

                    <p>
                      <strong>
                        Description:
                      </strong>{" "}
                      {transaction.description ||
                        "-"}
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(
                        transaction.date
                      ).toLocaleDateString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <div className="card-actions">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        setSelectedTransaction(
                          transaction
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          transaction.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TransactionList;