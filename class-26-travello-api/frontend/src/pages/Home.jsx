import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, ShieldCheck, Sparkles } from 'lucide-react';

export default function Home(){
 return <div>
  <section className="hero">
   <div className="hero-copy"><span className="eyebrow"><Sparkles size={15}/> Explore the world</span>
    <h1>Make your next journey <em>unforgettable.</em></h1>
    <p>Discover beautiful destinations, book curated tours, and manage every trip from one simple place.</p>
    <div className="hero-actions"><Link className="btn primary" to="/tours">Explore Tours <ArrowRight size={18}/></Link><Link className="btn ghost" to="/destinations">Destinations</Link></div>
   </div>
   <div className="hero-card"><Globe2 size={54}/><strong>Travel made simple</strong><span>Destinations → Tours → Booking</span></div>
  </section>
  <section className="features container">
   <div><ShieldCheck/><h3>Secure accounts</h3><p>JWT authentication with OTP verification.</p></div>
   <div><Globe2/><h3>Curated places</h3><p>Browse destinations and available tour packages.</p></div>
   <div><Sparkles/><h3>Easy booking</h3><p>Reserve seats and track your bookings instantly.</p></div>
  </section>
 </div>
}
