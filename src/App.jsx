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
    <div> Budget Tracker </div>
     

     
  );
}

export default App;