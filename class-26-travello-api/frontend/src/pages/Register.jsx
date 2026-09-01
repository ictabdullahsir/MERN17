import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api';
export default function Register(){
 const [form,setForm]=useState({name:'',email:'',password:''});const [error,setError]=useState('');const [loading,setLoading]=useState(false);const nav=useNavigate();
 const submit=async e=>{e.preventDefault();setLoading(true);setError('');try{const {data}=await authApi.register(form);nav('/verify-otp',{state:{email:form.email,devOtp:data.devOtp}})}catch(e){setError(e.response?.data?.message||'Registration failed')}finally{setLoading(false)}};
 return <div className="auth-wrap"><div className="auth-card"><h2>Create account</h2><p>Join Travello and start planning your next trip.</p><form onSubmit={submit}>{error&&<div className="alert error">{error}</div>}<label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Password<input type="password" required minLength="6" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label><button className="btn primary full" disabled={loading}>{loading?'Creating…':'Create account'}</button><p className="form-foot">Already registered? <Link to="/login">Sign in</Link></p></form></div></div>
}
