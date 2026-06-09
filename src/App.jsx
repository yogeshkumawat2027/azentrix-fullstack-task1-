import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import './App.css'

import {
  getTransactions,
} from "./services/transactionService";

import TransactionForm from "./components/TransactionForm";
// import TransactionTable from "./components/TransactionTable";
// import SummaryCards from "./components/SummaryCards";
// import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  return (
    <div>
     

      {/* <SummaryCards transactions={transactions} /> */}

      <TransactionForm
        transactions={transactions}
        setTransactions={setTransactions}
      />
{/* 
      <TransactionTable
        transactions={transactions}
        setTransactions={setTransactions}
      />

      <ExpenseChart transactions={transactions} /> */}
    </div>
  );
}

export default App;