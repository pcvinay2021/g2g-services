import { Navigate, Outlet, useLocation } from "react-router-dom";

function AdminRoute() {
  const location = useLocation();
  const token = localStorage.getItem("g2g_admin_token");

  if (!token) {
    return (
      <Navigate
        to="/admin"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}

export default AdminRoute;
