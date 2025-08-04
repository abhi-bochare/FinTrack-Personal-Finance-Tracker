const TransactionList = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-6 rounded-lg shadow-lg">
      <table className="w-full border-collapse bg-gray-800 text-gray-100">
        <thead className="bg-gray-700 text-gray-300">
          <tr>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Amount</th>
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-6 text-gray-400 italic bg-gray-900"
              >
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((txn) => (
              <tr
                key={txn.id}
                className="text-center border-t border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="py-3 px-4">{txn.title}</td>
                <td
                  className={`py-3 px-4 font-medium ${
                    txn.type === "income" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  ₹{txn.amount}
                </td>
                <td className="py-3 px-4 capitalize">{txn.type}</td>
                <td className="py-3 px-4">{txn.category}</td>
                <td className="py-3 px-4">{txn.date}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => onEdit(txn)}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => onDelete(txn.id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
