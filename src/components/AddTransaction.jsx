import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ref, push, set } from "firebase/database";
import { db } from "../firebase";

const categories = [
  "Food",
  "Transport",
  "Rent",
  "Salary",
  "Utilities",
  "Freelance",
  "Misc",
];

const AddTransaction = ({ isOpen, onClose, existingTxn = null }) => {
  const titleRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState(
    existingTxn || {
      title: "",
      amount: "",
      type: "income",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.amount ||
      !form.category ||
      !form.type ||
      !form.date
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const amount = Number(form.amount);
    if (form.type === "income" && amount < 0) {
      alert("Income amount should be positive.");
      return;
    }
    if (form.type === "expense" && amount > 0) {
      alert("Expense amount should be negative.");
      return;
    }

    const txnData = { ...form, amount };

    const txnRef = existingTxn
      ? ref(db, `transactions/${user.uid}/${existingTxn.id}`)
      : ref(db, `transactions/${user.uid}`);

    if (existingTxn) {
      await set(txnRef, txnData);
    } else {
      await push(txnRef, txnData);
    }

    onClose();
    setForm({
      title: "",
      amount: "",
      type: "income",
      category: "food",
      date: new Date().toISOString().split("T")[0],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            ref={titleRef}
            name="title"
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            autoFocus
            required
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="income">Income (+)</option>
            <option value="expense">Expense (-)</option>
          </select>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
