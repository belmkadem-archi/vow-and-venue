import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2,
  Sparkles,
  Calendar,
  Gift,
  AlignLeft
} from 'lucide-react';

const PRICING = [
  {
    name: "Free",
    price: "€0",
    description: "Perfect for casual gatherings and small events.",
    features: ["Standard Reveal Gates", "Basic Builder Suite", "Unlimited Guests", "RSVP Tracking", "1 Event Active"],
    cta: "Start Free",
    premium: false
  },
  {
    name: "Essential",
    price: "€149",
    description: "The professional choice for weddings and galas.",
    features: ["Everything in Free", "Day-of Timeline Manager", "Guest FAQ Accordions", "Gift Registry Manager", "Remove Watermark"],
    cta: "Go Essential",
    premium: true,
    popular: true
  },
  {
    name: "Premium",
    price: "€349",
    description: "A tailored digital masterpiece for high-end events.",
    features: ["Everything in Essential", "Custom Domain Name", "White-glove Design Support", "Advanced Analytics", "Priority Support"],
    cta: "Go Premium",
    premium: true
  }
];

export default function LandingPage() {
  return (
    <div className="landing-container" style={{ background: '#050505', minHeight: '100vh', color: '#fff' }}>
      
      {/* Navigation */}
      <nav className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ height: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.2rem', fontWeight: 500, letterSpacing: '0.1em' }}>
            <Sparkles size={20} color="var(--accent)" />
            <span>ETERNALVOWS</span>
          </div>
          <div style={{ display: 'flex', gap: '3rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <a href="#pricing" style={{ color: '#fff', textDecoration: 'none' }}>Pricing</a>
            <Link to="/templates" className="btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: '4px' }}>Create Masterpiece</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.4em', color: 'var(--accent)', textTransform: 'uppercase' }}>THE HIGHEST EVOLUTION OF INVITATIONS</span>
          <h1 className="hero-title" style={{ marginTop: '2rem' }}>Beyond Paper.<br/><span style={{ fontStyle: 'italic' }}>Beyond Ordinary.</span></h1>
          <p className="hero-subtitle">Elevate your wedding with an editorial unboxing experience. Digital invitations designed for the world's most beautiful love stories.</p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <Link to="/templates" className="btn-primary">Get Started</Link>
            <a href="#pricing" className="btn-secondary">View Pricing</a>
          </div>
        </motion.div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing" className="container" style={{ padding: '160px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 className="serif" style={{ fontSize: '3.5rem' }}>Elegance for Every Love Story</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', marginTop: '1.5rem' }}>Simple, transparent pricing to power your celebration.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {PRICING.map((plan, i) => (
            <motion.div 
              key={i} 
              className="glass" 
              style={{ 
                padding: '4rem 3rem', 
                borderRadius: '8px', 
                position: 'relative', 
                display: 'flex', 
                flexDirection: 'column',
                border: plan.popular ? '1px solid var(--accent)' : '1px solid var(--border)'
              }}
            >
              {plan.popular && <span style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#000', padding: '0.4rem 1.2rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em' }}>MOST POPULAR</span>}
              <h3 className="serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: '2.5rem', minHeight: '3rem' }}>{plan.description}</p>
              <div style={{ marginBottom: '3rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 400 }}>{plan.price}</span>
                <span style={{ fontSize: '0.9rem', opacity: 0.5, marginLeft: '0.5rem' }}>/ event</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 4rem 0', flex: 1 }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                    <CheckCircle2 size={16} color="var(--accent)" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/templates" className={plan.popular ? "btn-primary" : "btn-secondary"} style={{ width: '100%', textAlign: 'center' }}>{plan.cta}</Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Signature Features */}
      <section style={{ background: 'rgba(255,255,255,0.02)', padding: '160px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>
          <div>
            <Calendar size={32} color="var(--accent)" style={{ marginBottom: '2rem' }} />
            <h4 className="serif" style={{ fontSize: '1.8rem', marginBottom: '1.2rem' }}>Timeline Integration</h4>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>Keep your guests informed with a beautifully designed Day-of Timeline. Perfect for managing complex itineraries.</p>
          </div>
          <div>
            <AlignLeft size={32} color="var(--accent)" style={{ marginBottom: '2rem' }} />
            <h4 className="serif" style={{ fontSize: '1.8rem', marginBottom: '1.2rem' }}>Advanced FAQ</h4>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>Answering repetitive questions shouldn't be your job. Our FAQ manager handles everything from dress codes to directions.</p>
          </div>
          <div>
            <Gift size={32} color="var(--accent)" style={{ marginBottom: '2rem' }} />
            <h4 className="serif" style={{ fontSize: '1.8rem', marginBottom: '1.2rem' }}>Gift Registry</h4>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>Seamlessly integrate your IBAN or registry links directly into your invitation card for an elegant unboxing experience.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container" style={{ padding: '160px 0', textAlign: 'center' }}>
        <div className="glass" style={{ padding: '8rem 4rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 className="serif" style={{ fontSize: '4rem' }}>Your Love Story,<br/>Digitally Mastered.</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.3rem', margin: '2rem auto 4rem', maxWidth: '600px' }}>Join the collection of premium hosts who choose cinematic excellence over standard emails.</p>
          <Link to="/templates" className="btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1rem' }}>Create Your Legacy</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '80px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', opacity: 0.6 }}>
            <Sparkles size={16} color="var(--accent)" />
            <span style={{ fontSize: '0.9rem', letterSpacing: '0.1em' }}>ETERNALVOWS</span>
          </div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>
            © 2026 ETERNALVOWS. CINEMATIC INVITATION SUITE.
          </div>
        </div>
      </footer>
    </div>
  );
}
