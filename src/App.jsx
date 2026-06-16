import { useEffect, useState } from "react";
import Header from "./components/Header";
import { getTransactions } from "./services/transactionService";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  return (
    <div>
      <Header transactions={transactions} />
    </div>
  );
}

export default App;