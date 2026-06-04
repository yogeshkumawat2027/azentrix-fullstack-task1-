
const STORAGE_KEY = "budget_tracker";

//get all transactions
export const getTransactions = ()=>{  
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// add transaction

 export const addTransaction = (newTransaction)=>{

    const transactions = getTransactions();

    const transaction = {
        ...newTransaction,
        id: Date.now()  // unique
    }

    transactions.push(transaction);

    localStorage.setItem(STORAGE_KEY , JSON.stringify(transactions));

    return transaction;

 }
 // update transaction

export  const updateTransaction = (id , updatedData)=>{
    const transactions = getTransactions();

    const updatedTransactions = transactions.map((transaction)=>
           transaction.id === id
      ? { ...transaction, ...updatedData }
      : transaction
    );

    localStorage.setItem(STORAGE_KEY , JSON.stringify(updatedTransactions))
 }

 // delete transaction

 export const deleteTransaction = (id)=>{
    const transactions = getTransactions();

    const filteredTransactions = transactions.filter((transaction)=> transaction.id !== id)

    localStorage.setItem(STORAGE_KEY , JSON.stringify(filteredTransactions));

 }

 // clear all data 

export const clearTransactions = ()=>{
    localStorage.removeItem(STORAGE_KEY);
 }

