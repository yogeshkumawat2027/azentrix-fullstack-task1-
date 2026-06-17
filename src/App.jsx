import { useEffect, useState } from "react";

import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import EditTransactionModal from "./components/EditTransactionModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getTransactions } from "./services/transactionService";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  return (
    <>
      <Header transactions={transactions} />

      <TransactionForm
        transactions={transactions}
        setTransactions={setTransactions}
        setToast={setToast}
      />

      <TransactionList
        transactions={transactions}
        setTransactions={setTransactions}
        setSelectedTransaction={setSelectedTransaction}
        setToast={setToast}
      />

      <EditTransactionModal
        selectedTransaction={selectedTransaction}
        setSelectedTransaction={setSelectedTransaction}
        setTransactions={setTransactions}
        setToast={setToast}
      />

       <ToastContainer
    position="top-right"
    autoClose={3000}
  />
    </>
  );
}

export default App;