import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
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
import Header from './components/Header1';
import Form_Perfil from './pages/Profile/form_perfil';
import FullScreenLoader from './components/loaders/FullScreenLoader';
import { useEffect } from 'react';
import DashboardProduct from './pages/dashboard/DashboardProduct';
import DashboardLayout from './pages/dashboard/DashboardLayout';

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
                <RouteTracker setCurrentRoute={setCurrentRoute} />
                <Routes>
                  <Route
                    path="/*"
                    element={
                      <>
                        <Header />
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/search" element={<Search />} />
                          <Route path="/post/:slug" element={<ProductPage />} />

                        </Routes>
                        <PrivateRoute>
                          <Routes>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/profile/review" element={<Form_Perfil />} />
                          </Routes>
                        </PrivateRoute>
                        <Footer/>
                      </>
                    }
                  />
                  <Route
                    path="/dash/*"
                    element={
                      <PrivateRoute>
                        <Routes>
                          <Route index element={<Dashboard />} />
                          <Route path="/products" element={<DashboardLayout><h1>Ola mundo</h1></DashboardLayout>} />
                          <Route path="/customers" element={<DashboardLayout><h1>Clientes</h1></DashboardLayout>} />
                          <Route path="/settings" element={<DashboardLayout><h1>Definicoes</h1></DashboardLayout>} />
                          <Route path="/analytics" element={<DashboardLayout><h1>analytics</h1></DashboardLayout>} />
                          <Route path="/messages" element={<DashboardLayout><h1>Mensagens</h1></DashboardLayout>} />
                        </Routes>
                      </PrivateRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
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