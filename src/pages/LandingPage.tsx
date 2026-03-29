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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="screen-content"
                    style={{ background: `linear-gradient(to bottom, #080808, ${STEPS[activeStep]?.color}22)` }}
                  >
                    <div className="mock-ui" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div className="mock-header" style={{ height: '8px', width: '40%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
                      <div className="mock-card glass" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="mock-title" style={{ fontWeight: 800, fontSize: '1.2rem' }}>{STEPS[activeStep]?.title}</div>
                        <div className="mock-lines" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                          <div className="ln" style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
                          <div className="ln" style={{ height: '6px', width: '60%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
                        </div>
                      </div>
                      <div className="mock-footer" style={{ display: 'flex', justifyContent: 'center' }}>
                         <Plus style={{ color: STEPS[activeStep]?.color, opacity: 0.5 }} />
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
        <div className="cta-box glass">
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
      <footer className="footer container">
        <div className="footer-content">
          <div className="logo">
            <Sparkles className="logo-icon" />
            <span>VOW & VENUE</span>
          </div>
          <p>© 2026 Vow & Venue. Cinematic Experiences.</p>
        </div>
      </footer>
    </div>
  );
}
