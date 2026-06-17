import { useState } from "react";

import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";
import EditTransactionModal from "./components/EditTransactionModal";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import { getTransactions } from "./services/transactionService";

function App() {
  const [transactions, setTransactions] = useState(getTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="app-shell">

      <Header transactions={transactions} />

      <main className="dashboard-main">
        <section className="dashboard-workspace" aria-label="Transaction workspace">
          <div className="desktop-form-panel">
            <TransactionForm setTransactions={setTransactions} />
          </div>

          <TransactionList
            transactions={transactions}
            setTransactions={setTransactions}
            setSelectedTransaction={setSelectedTransaction}
            onAddClick={() => setIsAddModalOpen(true)}
          />
        </section>

        <ExpenseChart transactions={transactions} />

      </main>

      {isAddModalOpen && (
        <div
          className="add-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Add transaction"
        >
          <div className="add-modal">
            <button
              className="add-modal-close"
              type="button"
              aria-label="Close add transaction form"
              onClick={() => setIsAddModalOpen(false)}
            >
              X
            </button>
              
            <TransactionForm  setTransactions={setTransactions}  onTransactionAdded={() => setIsAddModalOpen(false)}  />
                    
          </div>
        </div>
      )}

      <EditTransactionModal
        selectedTransaction={selectedTransaction}
        setSelectedTransaction={setSelectedTransaction}
        setTransactions={setTransactions}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
