import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Users, 
  Music, 
  MapPin, 
  Image as ImageIcon, 
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.feature-step');
      let currentStep = 0;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          currentStep = index;
        }
      });
      setActiveStep(currentStep);
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
            <a href="#how-it-works">Process</a>
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ position: 'relative', zIndex: 10 }}
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
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="screen-content"
                    style={{ background: `linear-gradient(to bottom, #080808, ${STEPS[activeStep]?.color}11)` }}
                  >
                    <div className="mock-ui">
                      <div className="mock-header">
                        <div className="ln" style={{ width: '40%' }}></div>
                      </div>
                      <div className="mock-card anime-float">
                        <div className="mock-title">{STEPS[activeStep]?.title}</div>
                        <div className="mock-lines">
                          <div className="ln"></div>
                          <div className="ln"></div>
                        </div>
                      </div>
                      <div className="mock-footer">
                        <Plus className="mock-plus" style={{ color: STEPS[activeStep]?.color }} />
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

      {/* Final CTA */}
      <section className="cta-section section-padding container">
        <div className="cta-box glass text-center" style={{ padding: '6rem 2rem', borderRadius: '40px' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>Ready to WOW your guests?</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-dim)', marginBottom: '3rem' }}>
            Join 10,000+ hosts creating unforgettable experiences.
          </p>
          <Link to="/templates">
            <button className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
              Start Your Masterpiece
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer container section-padding">
        <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.5 }}>
          <div className="logo">
            <Sparkles className="logo-icon" size={18} />
            <span style={{ fontSize: '0.9rem' }}>VOW & VENUE</span>
          </div>
          <p style={{ fontSize: '0.8rem' }}>© 2026 Vow & Venue. Cinematic Experiences.</p>
        </div>
      </footer>
    </div>
  );
}
