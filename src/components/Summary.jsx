const Summary = ({ transactions }) => {
  const income = transactions
    .filter((txn) => txn.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const expense = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const balance = income - -expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-green-100 p-4 rounded-lg shadow">
        <h2 className="text-sm text-gray-600">Total Income</h2>
        <p className="text-xl font-bold text-green-700">₹{income}</p>
      </div>
      <div className="bg-red-100 p-4 rounded-lg shadow">
        <h2 className="text-sm text-gray-600">Total Expense</h2>
        <p className="text-xl font-bold text-red-700">₹{expense}</p>
      </div>
      <div className="bg-blue-100 p-4 rounded-lg shadow">
        <h2 className="text-sm text-gray-600">Current Balance</h2>
        <p className="text-xl font-bold text-blue-700">₹{balance}</p>
      </div>
    </div>
  );
};

export default Summary;
