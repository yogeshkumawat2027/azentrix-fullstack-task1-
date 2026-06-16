import { useEffect, useState } from "react";

import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";

import { getTransactions } from "./services/transactionService";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  return (
    <div>
      <Header transactions={transactions} />

      <TransactionForm
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default App;