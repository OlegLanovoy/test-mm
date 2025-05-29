import { useState } from "react";
import { TransactionsList } from "./components/transaction-list";
import TransactionDetail from "./components/trnsaction-detail";
import type { Transaction } from "./types/transaction";
import "./App.css";

function App() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  if (selectedTransaction) {
    return (
      <TransactionDetail
        transaction={selectedTransaction}
        onBack={() => setSelectedTransaction(null)}
      />
    );
  }

  return <TransactionsList onTransactionSelect={setSelectedTransaction} />;
}

export default App;
