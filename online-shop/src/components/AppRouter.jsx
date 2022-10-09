import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "../router/routes";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} exact={route.exact} element={<route.element />} />
      ))}
      <Route path="*" element={<Navigate to="/error" replace />} />
    </Routes>
  );
};

export default AppRouter;
