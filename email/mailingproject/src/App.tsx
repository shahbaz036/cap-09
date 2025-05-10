import { Routes, Route, Navigate } from 'react-router-dom';
import { SignIn } from '@/pages/auth/sign-in';
import { SignUp } from '@/pages/auth/sign-up';
import { Dashboard } from '@/pages/dashboard';
import { Mail } from '@/pages/mail';
import { ProtectedRoute } from '@/components/auth/protected-route';

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        <Route index element={<Navigate to="/mail/inbox" replace />} />
        <Route path="mail/:mailboxId" element={<Mail />} />
        <Route path="mail/:mailboxId/:mailId" element={<Mail />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;