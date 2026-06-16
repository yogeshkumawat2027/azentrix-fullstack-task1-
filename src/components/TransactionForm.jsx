import { getTransactions , addTransaction } from "../services/transactionService";

import { useState } from "react";

import "./TransactionForm.css"

 function TransactionForm({ setTransactions }){

    const expenseCategories = [ "Food" , "Travel" , "Shopping" , "Bills" , "HealthCare" , "Education " , "other"];
    const incomeSources = [ "salary" , "business" , "freelancing" , "other"];

    const [formData , setFormData] = useState({
        type : "expense",
        amount : "",
        catagories : "Food",
        description : ""
    });

    const handleTypeChange = (e)=>{
        const type = e.target.value;

        setFormData({
            ...formData , type , catogary:
                                   type === "expense" ? expenseCategories[0] : incomeSources[0],

        })
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!formData.amount) return;

        addTransaction({
            ...formData,
            amount: Number(formData.amount), 
            date : new Date().toISOString()
        });

        setTransactions(getTransactions);

        setFormData({
            type : "expense",
            amount : "",
            catogary
        })

    }
     const options = formData.type === "expense" ? expenseCategories  : incomeSources;
     
      

   
   return (
    <div className="transaction-form-container">
      <h2>Add Transaction</h2>

      <form className="transaction-form" onSubmit={handleSubmit} >
        
        <div className="form-group">
          <label>Transaction Type</label>

          <select value={formData.type} onChange={handleTypeChange} >
            
            <option value="expense">Expense</option>
            <option value="income">Income</option>

          </select>
        </div>

        <div className="form-group">
            
          <label>Amount (₹)</label>

          <input
            type="number"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>{formData.type === "expense" ? "Category": "Income Source"} </label>
            
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
          >
            {options.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            rows="3"
            placeholder="Optional description..."
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />
        </div>

        <button type="submit" className="submit-btn">Add Transaction</button>
                
      </form>
    </div>
  );
}

 export default TransactionForm;
