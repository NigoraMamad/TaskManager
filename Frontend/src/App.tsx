import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { JSX } from 'react';

// Компонент для защищённого маршрута — проверяет токен и либо показывает страницу, либо редиректит на логин
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('accessToken'); // тут поменял на accessToken
  const location = useLocation();

  if (!token) {
    // Если нет токена — редирект на /login с сохранением исходного пути
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Компонент для маршрутов, доступных только неавторизованным (например, логин, регистрация)
function PublicRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('accessToken'); // тоже поменял на accessToken

  if (token) {
    // Если есть токен — редиректим на главную /main
    return <Navigate to="/main" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={5000} />
      <Routes>
        {/* Редирект с корня на регистрацию */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/* Защищённый маршрут: доступен только если есть токен */}
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />

        {/* Публичные маршруты, доступные только если нет токена */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Можно добавить сюда 404 страницу */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;