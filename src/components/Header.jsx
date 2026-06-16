import "./Header.css";

function Header({ transactions }) {


    const income = transactions.filter((t)=> t.type === "income")
                 .reduce((sum , t)=> sum + Number(t.amount) , 0);

    const expenses = transactions
        .filter((t)=> t.type === "expense")
        .reduce((sum , t) => sum + Number(t.amount),0);
    

    const netBalance = income - expenses;

    const currDate = new Date();

    const monthYear = currDate.toLocaleDateString("en-IN" , { month  : "long" , year : "numeric"});

  const updatedDate = currDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });


   
    return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="brand-section">
          <div className="logo">BT</div>

          <div className="header-text">
            <h1>Personal Finance Dashboard</h1>

            <p>
              Clean overview of your monthly cash flow and
              transaction activity.
            </p>
            <span className="header-date">Updated {updatedDate}</span>
          </div>
        </div>

        <div className="month-section">
          <h2>{monthYear}</h2>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <span>Income</span>
          <h3>₹{income.toLocaleString("en-IN")}</h3>
        </div>

        <div className="stat-card">
          <span>Expenses</span>
          <h3>₹{expenses.toLocaleString("en-IN")}</h3>
        </div>

        <div className="stat-card">
          <span>Net Balance</span>
          <h3>₹{netBalance.toLocaleString("en-IN")}</h3>
        </div>

        <div className="stat-card">
          <span>Transactions</span>
          <h3>{transactions.length}</h3>
        </div>
      </div>
    </header>
  );
}

export default Header;