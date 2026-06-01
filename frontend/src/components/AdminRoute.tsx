import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";

type Props = {

  children: ReactNode;
};

function AdminRoute(

  { children }: Props

) {

  const token = localStorage.getItem(

    "token"
  );

  const role = localStorage.getItem(

    "role"
  );

  if (!token) {

    return <Navigate to="/login" />;
  }

  if (role !== "ADMIN") {

    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default AdminRoute;