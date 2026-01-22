import { lazy } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { AdminRoute } from './AdminRoute';
import { ProtectedRoute } from './ProtectedRoute';

const LandingPage = lazy(() => import('@pages/landing'));
const LoginPage = lazy(() => import('@pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@pages/auth/RegisterPage'));
const CabinetPage = lazy(() => import('@pages/cabinet'));
const AdminDashboard = lazy(() => import('@pages/admin'));
const NotFoundPage = lazy(() => import('@pages/error/NotFoundPage'));

export function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/cabinet" element={<CabinetPage />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
