import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";

export default function ProtectedDashboardRoute() {
  return (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  );
}
