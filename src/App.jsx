import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/dashboard/Dashboard';
import HomePage from './pages/Home';
import ProductPage from './pages/ProductPage';
import AnimatedBackground from './components/AnimatedBackground';
import HomeProvider from './context/HomeContext';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';
import PrivateRoute from './pages/Auth/PrivateRoute';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Form_Perfil from './pages/Profile/form_perfil';
import FullScreenLoader from './components/loaders/FullScreenLoader';
import { useEffect } from 'react';
import DashboardProduct from './pages/dashboard/DashboardProduct';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import { useAuth } from './context/AuthContext';
import RecoveryPasseword from './pages/Auth/RecoveryPasseword';
import HomeLayout from './layout/Homelayout';
import PageNotFound from './pages/404';

const RouteTracker = ({ setCurrentRoute }) => {
  const location = useLocation();

 useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location, setCurrentRoute]);

  return null;
};

function App() {
  const [currentRoute, setCurrentRoute] = React.useState('/');
  

  return (
    <Router>
      <LoadingProvider>
        <div className="relative min-h-screen">
          <AnimatedBackground />
          <Toaster position="top-right" />
          <AuthProvider>
            <HomeProvider>
              <Suspense fallback={<FullScreenLoader />}>
              <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/recovery-password" element={<RecoveryPasseword />} />

              <Route
                    path="/dash/*"
                    element={
                      <PrivateRoute>
                        <Routes>
                          <Route index element={<Dashboard />} />
                          <Route
                            path="/products"
                            element={<DashboardLayout><h1>Produtos</h1></DashboardLayout>}
                          />
                          <Route
                            path="/customers"
                            element={<DashboardLayout><h1>Clientes</h1></DashboardLayout>}
                          />
                          <Route
                            path="/settings"
                            element={<DashboardLayout><h1>Definições</h1></DashboardLayout>}
                          />
                          <Route
                            path="/analytics"
                            element={<DashboardLayout><h1>Analytics</h1></DashboardLayout>}
                          />
                          <Route
                            path="/messages"
                            element={<DashboardLayout><h1>Mensagens</h1></DashboardLayout>}
                          />
                        </Routes>
                      </PrivateRoute>
                    }
                  />
              </Routes>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/post/:slug" element={<HomeLayout><ProductPage /></HomeLayout>} />
                  
                  {/* Protected Routes */}
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <HomeLayout><Profile /></HomeLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile/review"
                    element={
                      <PrivateRoute>
                        <Form_Perfil />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<PageNotFound/>} />
                </Routes>
              </Suspense>
            </HomeProvider>
          </AuthProvider>
        </div>
      </LoadingProvider>
      
    </Router>
  );
}

export default App;