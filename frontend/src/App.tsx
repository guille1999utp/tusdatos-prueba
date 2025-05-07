import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminPanelLayout from "./components/layout/admin-panel-layout";
import { Dashboard } from "./app/dashboard/Dashboard";
import { AuthProvider } from "./auth/AuthContext";
import SignIn from "./app/SignIn";
import Register from "./app/Register";
import { Events } from "./app/events/Events";
import { PublicRoute } from "./auth/PublicRoute";
import { PrivateRoute } from "./auth/PrivateRoute";
import { ToastContainer } from 'react-toastify';
import { AllEvents } from "./app/all-events/AllEvents";


function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Redirigir a /dashboard si ya estás autenticado */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Rutas públicas (login/register) solo si NO estás autenticado */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Rutas privadas (requieren token) */}
            <Route element={<PrivateRoute />}>
              <Route element={<AdminPanelLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="events" element={<Events />} />
                <Route path="all-events" element={<AllEvents />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
