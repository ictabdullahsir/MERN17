import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Compass, LayoutDashboard, LogIn, LogOut, Menu, UserPlus, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOtp from './pages/VerifyOtp';
import Dashboard from './pages/Dashboard';
import Destinations from './pages/Destinations';
import Tours from './pages/Tours';
import Bookings from './pages/Bookings';
import './styles.css';

function Protected({ children, admin = false }) {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (admin && !isAdmin) return <Navigate to="/" replace />;
  return children;
}

function Layout() {
  const { user, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const links = [
    ['Destinations','/destinations'], ['Tours','/tours'],
    ...(user ? [['My Bookings','/bookings']] : []),
    ...(isAdmin ? [['Admin Dashboard','/dashboard']] : []),
  ];
  return <div className="app-shell">
    <header className="navbar">
      <Link className="brand" to="/" onClick={() => setOpen(false)}><Compass size={26}/> Travello</Link>
      <button className="mobile-toggle" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {links.map(([label,path]) => <Link key={path} className={location.pathname===path?'active':''} to={path} onClick={()=>setOpen(false)}>{label}</Link>)}
        {user ? <button className="nav-btn" onClick={()=>{logout();nav('/')}}><LogOut size={17}/> Logout</button> :
          <><Link to="/login" onClick={()=>setOpen(false)}><LogIn size={17}/> Login</Link><Link className="nav-cta" to="/register" onClick={()=>setOpen(false)}><UserPlus size={17}/> Register</Link></>}
      </nav>
    </header>
    <main>{/* page content */}<Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/verify-otp" element={<VerifyOtp/>}/>
      <Route path="/destinations" element={<Destinations/>}/>
      <Route path="/tours" element={<Tours/>}/>
      <Route path="/bookings" element={<Protected><Bookings/></Protected>}/>
      <Route path="/dashboard" element={<Protected admin><Dashboard/></Protected>}/>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes></main>
    <footer>© {new Date().getFullYear()} Travello · Travel smarter, go farther.</footer>
  </div>
}

export default function App(){ return <Layout/>; }
