import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { clearUser } from "../redux/authSlice";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import AddTransaction from "../components/AddTransaction";
import { ref, db, onValue } from "../firebase";
import TransactionList from "../components/TransactionList";
import Summary from "../components/Summary";
import { remove, ref as dbRef } from "firebase/database";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [editTxn, setEditTxn] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    if (!user) return;
    const txnRef = ref(db, `transactions/${user.uid}`);
    const unsubscribe = onValue(txnRef, (snapshot) => {
      const data = snapshot.val();
      const txnList = data
        ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
        : [];
      setTransactions(txnList);
    });
    return () => unsubscribe();
  }, [user]);

  const filteredTransactions = transactions
    .filter((txn) => (typeFilter === "all" ? true : txn.type === typeFilter))
    .filter((txn) =>
      categoryFilter === "all" ? true : txn.category === categoryFilter
    )
    .sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOption === "oldest") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortOption === "high") {
        return b.amount - a.amount;
      } else {
        return a.amount - b.amount;
      }
    });

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    navigate("/login");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      const txnPath = dbRef(db, `transactions/${user.uid}/${id}`);
      await remove(txnPath);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <header className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-extrabold text-blue-400">
          💰 FinTrack Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>

      <Summary transactions={transactions} />

      <div className="flex justify-start mb-6">
        <button
          onClick={() => setOpen(true)}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ➕ Add Transaction
        </button>
      </div>

      <AddTransaction
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
          setEditTxn(null);
        }}
        existingTxn={editTxn}
      />

      <div className="flex flex-wrap gap-4 items-center mb-6">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
        >
          <option value="all">All Categories</option>
          {Array.from(new Set(transactions.map((txn) => txn.category))).map(
            (cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            )
          )}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
        >
          <option value="newest">Date: Newest First</option>
          <option value="oldest">Date: Oldest First</option>
          <option value="high">Amount: High to Low</option>
          <option value="low">Amount: Low to High</option>
        </select>
      </div>

      <TransactionList
        transactions={filteredTransactions}
        onEdit={(txn) => {
          setEditTxn(txn);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
