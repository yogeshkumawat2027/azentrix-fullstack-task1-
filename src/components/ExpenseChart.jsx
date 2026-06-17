import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import "./ExpenseChart.css";

const COLORS = [
  "#2563eb",
  "#14b8a6",
  "#f59e0b",
  "#ef4444",
  "#7c3aed",
  "#0891b2",
  "#db2777",
];

function ExpenseChart({ transactions }) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = transactions.filter((transaction) => {
    const date = new Date(transaction.date);

    return (
      transaction.type === "expense" &&
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });

  const categoryTotals = monthlyExpenses.reduce((totals, transaction) => {
    const category = transaction.category || "Other";
    totals[category] = (totals[category] || 0) + Number(transaction.amount);
    return totals;
  }, {});

  const chartData = Object.keys(categoryTotals)
    .map((category) => ({
      name: category,
      value: categoryTotals[category],
    }))
    .sort((first, second) => second.value - first.value);

  const totalExpenses = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="chart-container">
      <div className="chart-header">
        <div>
          <h2>Monthly Expense Analysis</h2>
          <p>Category split for this month</p>
        </div>

        <strong>₹{totalExpenses.toLocaleString("en-IN")}</strong>
      </div>

      {chartData.length === 0 ? (
        <div className="no-chart-data">No expense data available for this month.</div>
      ) : (
        <div className="analysis-layout">
          <div className="pie-panel">
            <ResponsiveContainer width="100%" height={360}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={74}
                  outerRadius={132}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Amount"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="breakdown-panel">
            {chartData.map((item, index) => {
              const percentage = Math.round((item.value / totalExpenses) * 100);

              return (
                <div className="breakdown-item" key={item.name}>
                  <div className="breakdown-row">
                    <span>
                      <i
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        aria-hidden="true"
                      />
                      {item.name}
                    </span>
                    <strong>
                      {percentage}% · ₹{item.value.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="progress-track" aria-hidden="true">
                    <div
                      className="progress-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default ExpenseChart;
