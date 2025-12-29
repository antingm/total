// Main App Component with Routing
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Shell/Navbar';
import HomePage from './components/Shell/HomePage';
import LoginPage from './components/Auth/LoginPage';
import Dashboard from './components/Admin/Dashboard';
import SetupPage from './components/Admin/SetupPage';
import ModuleConfigPage from './components/Admin/ModuleConfigPage';
import AdminGuard from './components/Admin/AdminGuard';
import { FeatureGuard } from './components/Guards/FeatureGuard';

// Dynamic Imports - Lazy Loading for each Demo
const Demo1 = lazy(() => import('./demos/demo-1'));
const Demo2 = lazy(() => import('./demos/demo-2'));
const Demo3 = lazy(() => import('./demos/demo-3'));
const Demo4 = lazy(() => import('./demos/demo-4'));
const Demo5 = lazy(() => import('./demos/demo-5'));
const Demo6 = lazy(() => import('./demos/demo-6'));
const AntingmAuto = lazy(() => import('./demos/antingm-auto'));
const AntingmStudio = lazy(() => import('./demos/antingm-studio'));
const ModularDemo = lazy(() => import('./demos/demo-modular-example'));

// Loading Fallback Component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 border-4 border-t-[var(--color-primary)] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          <div className="absolute inset-2 border-4 border-t-transparent border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        </div>
        <p className="text-[var(--color-text-muted)] animate-pulse">載入專案中...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--color-background)] theme-dark">
        <Navbar />

        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Admin Routes - Protected */}
            <Route path="/admin" element={
              <AdminGuard>
                <Dashboard />
              </AdminGuard>
            } />

            {/* Setup Page - For initializing Firestore */}
            <Route path="/setup" element={<SetupPage />} />

            {/* Module Config Page - Protected */}
            <Route path="/admin/modules" element={
              <AdminGuard>
                <ModuleConfigPage />
              </AdminGuard>
            } />

            {/* Demo Routes - Feature Flag Protected */}
            <Route path="/demo-1/*" element={
              <FeatureGuard demoId="demo-1">
                <Demo1 />
              </FeatureGuard>
            } />

            <Route path="/demo-2/*" element={
              <FeatureGuard demoId="demo-2">
                <Demo2 />
              </FeatureGuard>
            } />

            <Route path="/demo-3/*" element={
              <FeatureGuard demoId="demo-3">
                <Demo3 />
              </FeatureGuard>
            } />

            <Route path="/demo-4/*" element={
              <FeatureGuard demoId="demo-4">
                <Demo4 />
              </FeatureGuard>
            } />

            <Route path="/demo-5/*" element={
              <FeatureGuard demoId="demo-5">
                <Demo5 />
              </FeatureGuard>
            } />

            <Route path="/demo-6/*" element={
              <FeatureGuard demoId="demo-6">
                <Demo6 />
              </FeatureGuard>
            } />

            <Route path="/antingm-auto/*" element={
              <FeatureGuard demoId="antingm-auto">
                <AntingmAuto />
              </FeatureGuard>
            } />

            <Route path="/antingm-studio/*" element={
              <FeatureGuard demoId="antingm-studio">
                <AntingmStudio />
              </FeatureGuard>
            } />

            <Route path="/demo-modular/*" element={<ModularDemo />} />

            {/* 404 Fallback */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-[var(--color-primary)] mb-4">404</h1>
                  <p className="text-[var(--color-text-muted)]">頁面不存在</p>
                </div>
              </div>
            } />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
