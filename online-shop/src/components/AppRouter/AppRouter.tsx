import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "../../router/routes";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={<route.element />} />
      ))}
      <Route path="/online-shop" element={<Navigate to="/catalog" replace />} />
      <Route path="*" element={<Navigate to="/error" replace />} />
    </Routes>
  );
};

export default AppRouter;
