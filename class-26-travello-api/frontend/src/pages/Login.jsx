import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login(){
 const [form,setForm]=useState({email:'',password:''}); const [error,setError]=useState(''); const [loading,setLoading]=useState(false); const {login}=useAuth(); const nav=useNavigate();
 const submit=async e=>{e.preventDefault();setError('');setLoading(true);try{const {data}=await authApi.login(form);login(data);nav(data.data.user.role==='admin'?'/dashboard':'/tours')}catch(e){setError(e.response?.data?.message||'Login failed')}finally{setLoading(false)}};
 return <AuthCard title="Welcome back" subtitle="Sign in to continue your journey."><form onSubmit={submit}>{error&&<div className="alert error">{error}</div>}<label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Password<input type="password" required minLength="6" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label><button className="btn primary full" disabled={loading}>{loading?'Signing in…':'Sign in'}</button><p className="form-foot">New here? <Link to="/register">Create an account</Link></p></form></AuthCard>
}
function AuthCard({title,subtitle,children}){return <div className="auth-wrap"><div className="auth-card"><h2>{title}</h2><p>{subtitle}</p>{children}</div></div>}
export { AuthCard };
