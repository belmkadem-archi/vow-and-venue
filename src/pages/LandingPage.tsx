import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Send, 
  Users, 
  Music, 
  MapPin, 
  Image as ImageIcon, 
  CheckCircle2,
  Smartphone,
  Sparkles
} from 'lucide-react';

const STEPS = [
  {
    title: "Select Your Canvas",
    description: "Choose from our curated collection of editorial templates designed by world-class typographers.",
    visual: "Templates Grid View",
    color: "#6366f1"
  },
  {
    title: "Infuse Your Essence",
    description: "Add your favorite soundtrack, a personal voice note, and custom animations that reflect your style.",
    visual: "Customization Interface",
    color: "#a855f7"
  },
  {
    title: "Digital Unboxing",
    description: "Our signature 'envelope' unfolds with a sense of wonder, creating a premium first impression on any device.",
    visual: "Unboxing Animation",
    color: "#ec4899"
  },
  {
    title: "Viral Sharing",
    description: "Instantly share your masterpiece through WhatsApp, Instagram Stories, or a custom digital link.",
    visual: "Sharing Interface",
    color: "#10b981"
  }
];

const FEATURES = [
  {
    icon: <Users className="icon" />,
    title: "RSVP Dashboard",
    description: "Instant notifications and detailed guest lists with export options."
  },
  {
    icon: <Music className="icon" />,
    title: "Atmospheric Audio",
    description: "Embed high-fidelity music that sets the mood from the first second."
  },
  {
    icon: <MapPin className="icon" />,
    title: "Live Maps & Weather",
    description: "Give guests live directions and local weather updates for the event."
  },
  {
    icon: <ImageIcon className="icon" />,
    title: "Private Gallery",
    description: "A shared space for guests to upload photos during and after the event."
  }
];

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0);

  // Handle sticky scroll active step
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      // Precision sticky scroll logic from the masterpiece
      const stepIndex = Math.floor(scrollPos / (windowHeight * 0.72)) - 1;
      if (stepIndex >= 0 && stepIndex < STEPS.length) {
        setActiveStep(stepIndex);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar glass">
        <div className="container nav-content">
          <div className="logo">
            <Sparkles className="logo-icon" />
            <span>VOW & VENUE</span>
          </div>
          <div className="nav-links">
            <a href="#how-it-works">Showcase</a>
            <a href="#features">Features</a>
            <Link to="/templates">
              <button className="btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section container">
        <div className="hero-glow"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="badge">The Future of Invitations</span>
          <h1 className="hero-title">
            Crafting Your <span className="gradient-text">Digital Masterpiece</span>
          </h1>
          <p className="hero-subtitle">
            Beyond paper. Beyond email. Create an editorial invitation experience that leaves your guests in awe.
          </p>
          <div className="hero-btns">
            <Link to="/templates" style={{ textDecoration: 'none' }}>
              <button className="btn-primary">Create Your Invite</button>
            </Link>
            <a href="#how-it-works" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary">View Showcase</button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* How It Works (Sticky Scroll) */}
      <section id="how-it-works" className="how-it-works container">
        <div className="sticky-scroll-container">
          <div className="sticky-scroll-content">
            {STEPS.map((step, index) => (
              <div key={index} className="feature-step">
                <motion.div
                  initial={{ opacity: 0.2 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-20%" }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="step-num">Step 0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
          
          <div className="sticky-scroll-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="screen-content"
                    style={{ 
                      height: '100%',
                      background: `linear-gradient(to bottom, #080808, ${STEPS[activeStep]?.color}33)` 
                    }}
                  >
                    <div className="mock-ui" style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <div className="mock-header" style={{ height: '4px', width: '30%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}></div>
                      
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                        {/* Step 1: Select Your Canvas Animation */}
                        {activeStep === 0 && (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                            {[1, 2, 3].map(i => (
                              <motion.div 
                                key={i}
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className="glass"
                                style={{ height: '80px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', background: `linear-gradient(90deg, rgba(255,255,255,0.02) 0%, transparent 100%)` }}
                              ></motion.div>
                            ))}
                          </div>
                        )}

                        {/* Step 2: Infuse Your Essence Animation (Audio Waves) */}
                        {activeStep === 1 && (
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            {[1,2,3,4,5,6,7,8].map(i => (
                              <motion.div 
                                key={i}
                                animate={{ height: [10, 40, 10] }}
                                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.1 }}
                                style={{ width: '4px', background: 'var(--primary)', borderRadius: '2px' }}
                              ></motion.div>
                            ))}
                          </div>
                        )}

                        {/* Step 3: Digital Unboxing Animation */}
                        {activeStep === 2 && (
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <motion.div 
                              animate={{ rotateX: [0, 45, 0], scale: [1, 1.1, 1] }} 
                              transition={{ repeat: Infinity, duration: 3 }}
                              style={{ width: '120px', height: '80px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--primary)', borderRadius: '4px' }}
                            ></motion.div>
                          </div>
                        )}

                        {/* Step 4: Viral Sharing Animation */}
                        {activeStep === 3 && (
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <motion.div 
                              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', filter: 'blur(10px)' }}
                            ></motion.div>
                          </div>
                        )}
                      </div>

                      <div className="mock-footer" style={{ display: 'flex', justifyContent: 'center' }}>
                         <Plus size={32} style={{ color: STEPS[activeStep]?.color, filter: `drop-shadow(0 0 10px ${STEPS[activeStep]?.color})` }} />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="features-section container">
        <div className="section-header">
          <h2>Elevating Every Detail</h2>
          <p>Powerful tools designed for the modern host.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((feature, index) => (
            <div key={index} className="feature-card glass">
              {feature.icon}
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Section (Restored Masterpiece Section) */}
      <section className="promo-section container">
        <div className="promo-card glass">
          <div className="promo-text">
            <span className="badge">Digital-First Growth</span>
            <h3>Instant Viral Sharing</h3>
            <p>
              Your invitation is more than an email. It's a high-fidelity digital 
              asset optimized for mobile sharing. Generate beautiful "Teaser" 
              videos for Instagram Stories or send direct "Digital Envelopes" 
              to your guest lists via WhatsApp.
            </p>
            <ul className="promo-list">
              <li><CheckCircle2 className="list-icon" /> 1-Click WhatsApp Sharing</li>
              <li><CheckCircle2 className="list-icon" /> Optimized for Instagram Stories</li>
              <li><CheckCircle2 className="list-icon" /> Real-time RSVP Tracking & Analytics</li>
            </ul>
          </div>
          <div className="promo-visual">
            <div className="sharing-mockup glass">
              <div className="share-icons">
                <Smartphone className="share-icon" />
                <Send className="share-icon" />
                <Sparkles className="share-icon" />
              </div>
              <div className="share-stats" style={{ padding: '0 3rem', width: '100%' }}>
                <div className="stat" style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.5rem' }}>98% Open Rate</div>
                <div className="stat-bar" style={{ height: '4px', background: 'var(--primary)', width: '98%', borderRadius: '2px', boxShadow: '0 0 10px var(--primary)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section container">
        <div className="cta-box glass" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, var(--primary-glow) 0%, transparent 70%)', opacity: 0.2, zIndex: -1 }}></div>
          <h2>Ready to WOW your guests?</h2>
          <p>Join 10,000+ hosts creating unforgettable experiences.</p>
          <Link to="/templates">
            <button className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
              Start Your Masterpiece
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" style={{ background: '#050505', padding: '100px 0 60px' }}>
        <div className="container">
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '80px' }}>
            <div className="footer-brand">
              <div className="logo" style={{ marginBottom: '1.5rem' }}>
                <Sparkles className="logo-icon" />
                <span>VOW & VENUE</span>
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.8' }}>
                Elevating the world of digital invitations with cinematic unboxing experiences and editorial design.
              </p>
            </div>
            <div className="footer-links">
              <h5 style={{ marginBottom: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Product</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><a href="#how-it-works" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem' }}>Showcase</a></li>
                <li><Link to="/templates" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem' }}>Templates</Link></li>
                <li><a href="#" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem' }}>Pricing</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h5 style={{ marginBottom: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Support</h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><a href="#" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem' }}>Guidelines</a></li>
                <li><a href="#" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</a></li>
                <li><a href="#" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom" style={{ borderTop: '1px solid var(--border)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
            <p>© 2026 Vow & Venue. Masterpiece Invitations.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ color: 'inherit' }}>Twitter</a>
              <a href="#" style={{ color: 'inherit' }}>Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
