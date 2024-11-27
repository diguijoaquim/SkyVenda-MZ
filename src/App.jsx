import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Dashboard from './components/dashboard/Dashboard';
import DashboardProduct from './components/dashboard/DashboardProduct';
import HomePage from './components/home/HomePage';
import ProductPage from './components/ProductPage';
import AnimatedBackground from './components/AnimatedBackground';
import HomeProvider from './context/HomeContext';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Search from './components/home/search';
import Perfil from './components/perfil/perfil';
import Header from './components/Header1';
import Form_Perfil from './components/perfil/form_perfil';
import FullScreenLoader from './components/loaders/FullScreenLoader';

const RouteTracker = ({ setCurrentRoute }) => {
  const location = useLocation();

  React.useEffect(() => {
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
                          <Route path="/profile" element={<Perfil />} />
                          <Route path="/profile/review" element={<Form_Perfil />} />
                          <Route path="/search" element={<Search />} />
                          <Route path=":slug" element={<ProductPage />} />
                        </Routes>
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
                          <Route path="product/:id" element={<DashboardProduct />} />
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