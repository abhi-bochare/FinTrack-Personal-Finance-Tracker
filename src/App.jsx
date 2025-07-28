import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./redux/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./routes/ProtectedRoute";
import { auth } from "./firebase";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { Navigate } from "react-router";

function App() {
  const dispatch = useDispatch();
  const [authResolved, setAuthResolved] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(setUser({ uid, email, displayName }));
      } else {
        dispatch(clearUser());
      }
      setAuthResolved(true);
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (!authResolved) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

export default App;
