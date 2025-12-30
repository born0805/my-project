import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { authService } from './services/authService'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import UserList from './pages/UserList'
import ShopList from './pages/ShopList'
import ProductList from './pages/ProductList'
import OrderList from './pages/OrderList'
import OrderCreate from './pages/OrderCreate'
import AdminDashboard from './pages/AdminDashboard'
import OwnerDashboard from './pages/OwnerDashboard'

// 路由守卫组件
function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode, requiredRole?: string }) {
  const user = authService.getCurrentUser()
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />
  }
  
  return <>{children}</>
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/owner" element={
          <ProtectedRoute requiredRole="OWNER">
            <OwnerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute>
            <Layout>
              <UserList />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/shops" element={
          <ProtectedRoute>
            <Layout>
              <ShopList />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/products/:shopId" element={
          <ProtectedRoute>
            <Layout>
              <ProductList />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/orders/:shopId" element={
          <ProtectedRoute>
            <Layout>
              <OrderList />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/orders/:shopId/create" element={
          <ProtectedRoute>
            <Layout>
              <OrderCreate />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App

