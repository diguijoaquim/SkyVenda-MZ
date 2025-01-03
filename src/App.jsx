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
import HomeProvider from './context/HomeContext';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';
import { Toaster as Toasters  } from "./components/ui/toaster"
import PrivateRoute from './pages/Auth/PrivateRoute';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Form_Perfil from './pages/Profile/form_perfil';
import FullScreenLoader from './components/loaders/FullScreenLoader';
import { useEffect } from 'react';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import RecoveryPasseword from './pages/Auth/RecoveryPasseword';
import HomeLayout from './layout/Homelayout';
import PageNotFound from './pages/404';
import Teste from './pages/teste';
import Sellers from './pages/sellers';
import MyProducts from './pages/myproducts';
import SkyBackground from './components/bg';
import CategoryPage from './pages/CategoryPage';
import ProductProvince from './pages/firlterByProvince';
import BestBolada from './pages/bestbolada';
import Pedidos from './pages/pedidos';

const RouteTracker = ({ setCurrentRoute }) => {
  const location = useLocation();

 useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location, setCurrentRoute]);

  return null;
};

function App() {

  return (
    <Router>
      <LoadingProvider>
        <div className="relative min-h-screen">
        <SkyBackground/>
          <Toaster position="top-right" />
          <Toasters/>
          <AuthProvider>
            <HomeProvider>
              <Suspense fallback={<FullScreenLoader />}>
              <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/teste" element={<Teste />} />
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
                  <Route path="/:categoria/:subcategoria" element={<CategoryPage/>} />
                  <Route path="/pedidos" element={<HomeLayout><Pedidos/></HomeLayout>} />
                  <Route path="/produtos" element={<HomeLayout><MyProducts/></HomeLayout>} />
                  <Route path="/estatistaicas" element={<HomeLayout><h1>estatistaicas</h1></HomeLayout>} />
                  <Route path="/nhonguistas" element={<HomeLayout><Sellers/></HomeLayout>} />
                  <Route path="/p/:province" element={<HomeLayout><ProductProvince/></HomeLayout>} />
                  <Route path="/melhores-boladas" element={<HomeLayout><BestBolada/></HomeLayout>} />


                  
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