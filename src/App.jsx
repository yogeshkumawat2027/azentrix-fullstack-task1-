import Header from "./components/Header";
import { getTransactions } from "./services/transactionService";

function App() {
  const transactions = getTransactions();

  return (
    <div>
      <Header transactions={transactions} />
    </div>
  );
}

export default App;