import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import './App.css'

import TransactionTable from './components/TransactionTable'

import {
  initializeData,
} from "./data/budgetStorage";


import { getTransactions } from './services/transactionService';


function App() {

  const transactions = getTransactions();
  useEffect(() => {
    initializeData();

    console.log(getTransactions());
  }, []);

  return (
    <div>
     <TransactionTable></TransactionTable>
    </div>
  );
}

export default App;