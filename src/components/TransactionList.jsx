const TransactionList = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg shadow">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className="text-center border-t">
              <td className="py-2 px-4">{txn.title}</td>
              <td
                className={`py-2 px-4 ${
                  txn.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹{txn.amount}
              </td>
              <td className="py-2 px-4 capitalize">{txn.type}</td>
              <td className="py-2 px-4">{txn.category}</td>
              <td className="py-2 px-4">{txn.date}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => onEdit(txn)}
                  className="px-2 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(txn.id)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
