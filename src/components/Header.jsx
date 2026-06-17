import "./Header.css";

function Header({ transactions }) {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const netBalance = income - expenses;
  const currDate = new Date();

  const monthYear = currDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

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
          <div className="logo" aria-label="Logo placeholder">
            PF
          </div>

          <div className="header-text">
            <h1>Personal Finance Dashboard</h1>
            <p className="header-subtitle">
              Clean overview of your monthly cash flow and transaction activity.
            </p>
          </div>
        </div>

        <div className="header-meta">
          <span className="header-date">Last Updated {updatedDate}</span>
          <span className="month-section">{monthYear}</span>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <span>Income</span>
          <h3>{"\u20B9"}{income.toLocaleString("en-IN")}</h3>
        </div>

        <div className="stat-card">
          <span>Expenses</span>
          <h3>{"\u20B9"}{expenses.toLocaleString("en-IN")}</h3>
        </div>

        <div className="stat-card">
          <span>Net Balance</span>
          <h3>{"\u20B9"}{netBalance.toLocaleString("en-IN")}</h3>
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
