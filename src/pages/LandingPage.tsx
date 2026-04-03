import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="view-landing" className="view active">
      {/* Global Nav for Landing */}
      <nav className="global-nav">
        <a href="/" className="nav-logo">Eternal<span>Vows</span></a>
        <div className="nav-links">
          <a onClick={() => handleScrollTo('features')}>Features</a>
          <a onClick={() => handleScrollTo('templates')}>Templates</a>
          <a onClick={() => handleScrollTo('pricing')}>Pricing</a>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/builder')}>Sign in</button>
          <button className="btn btn-dark btn-sm" onClick={() => navigate('/builder')}>Start free</button>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-bg"></div>
        <div className="hero-deco tl">❧</div>
        <div className="hero-deco br">❧</div>
        <div className="hero-content">
          <div className="hero-eyebrow">Digital Wedding Invitations</div>
          <h1 className="hero-title">Your love story<br />deserves a <em>beautiful</em><br />beginning</h1>
          <p className="hero-sub">Create stunning digital wedding invitations in minutes. Share with all your guests in one link. Collect RSVPs effortlessly.</p>
          <div className="hero-actions">
            <button className="btn btn-dark" onClick={() => navigate('/builder')} style={{ fontSize: '14px', padding: '14px 32px' }}>Create your invitation</button>
            <button className="btn btn-outline" onClick={() => navigate('/builder')} style={{ fontSize: '14px', padding: '14px 32px' }}>See a live demo</button>
          </div>
          <div className="hero-stats">
            <div><div className="stat-num">10k+</div><div className="stat-lbl">Couples</div></div>
            <div><div className="stat-num">4.9★</div><div className="stat-lbl">Rating</div></div>
            <div><div className="stat-num">98%</div><div className="stat-lbl">RSVP rate</div></div>
            <div><div className="stat-num">5 min</div><div className="stat-lbl">To publish</div></div>
          </div>
        </div>
      </div>

      <div id="features" className="section">
        <div className="section-eyebrow">Everything you need</div>
        <h2 className="section-title">Built for your perfect day</h2>
        <p className="section-sub">Every feature you need to create, share and manage your wedding invitations.</p>
        <div className="features-grid">
          <div className="feature-card"><div className="feature-icon">✦</div><div className="feature-title">Beautiful templates</div><div className="feature-desc">Choose from elegant designs crafted by professional designers. Garden, Golden, Rose, Ivory and more.</div></div>
          <div className="feature-card"><div className="feature-icon">📋</div><div className="feature-title">RSVP tracking</div><div className="feature-desc">Collect guest responses in real time. Know exactly who is coming before the big day.</div></div>
          <div className="feature-card"><div className="feature-icon">📅</div><div className="feature-title">Day-of timeline</div><div className="feature-desc">Add your full wedding schedule so guests always know what happens next.</div></div>
          <div className="feature-card"><div className="feature-icon">🌍</div><div className="feature-title">Multi-language</div><div className="feature-desc">English, French, Arabic and more. Your guests read in their own language automatically.</div></div>
          <div className="feature-card"><div className="feature-icon">📤</div><div className="feature-title">Share anywhere</div><div className="feature-desc">Share via link, WhatsApp, SMS or email. Works perfectly on every device.</div></div>
          <div className="feature-card"><div className="feature-icon">🎁</div><div className="feature-title">Gift and FAQs</div><div className="feature-desc">Add bank details, gift messages, dress code and FAQs all in one beautiful place.</div></div>
        </div>
      </div>

      <div id="templates" className="templates-showcase">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="section-eyebrow">Design templates</div>
          <h2 className="section-title">Find your perfect style</h2>
          <p className="section-sub" style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto 48px' }}>Four distinct aesthetics, each crafted for a different kind of love story.</p>
          <div className="showcase-grid">
            <Link to="/builder" className="showcase-card">
              <div className="showcase-thumb" style={{ background: 'linear-gradient(160deg,#e8f0e4,#f5f0e8)' }}>
                <div className="s-names" style={{ color: '#2a3d28' }}>Sarah &amp; James</div>
                <div className="s-date" style={{ color: '#4a6741' }}>JUNE 14, 2025</div>
              </div>
              <div className="showcase-name">Garden of Eden</div>
            </Link>
            <Link to="/builder" className="showcase-card">
              <div className="showcase-thumb" style={{ background: 'linear-gradient(160deg,#1c1a18,#2d2720)' }}>
                <div className="s-names" style={{ color: '#faf7f2' }}>Isabella &amp; Sebastian</div>
                <div className="s-date" style={{ color: '#c9a96e' }}>OCTOBER 5, 2025</div>
              </div>
              <div className="showcase-name">Golden Night</div>
            </Link>
            <Link to="/builder" className="showcase-card">
              <div className="showcase-thumb" style={{ background: 'linear-gradient(160deg,#f9eff5,#ede0ec)' }}>
                <div className="s-names" style={{ color: '#4a1e35' }}>Layla &amp; Karim</div>
                <div className="s-date" style={{ color: '#9b5a7a' }}>SEPTEMBER 20, 2025</div>
              </div>
              <div className="showcase-name">Rose Bloom</div>
            </Link>
            <Link to="/builder" className="showcase-card">
              <div className="showcase-thumb" style={{ background: 'linear-gradient(160deg,#faf6f0,#f5ede0)' }}>
                <div className="s-names" style={{ color: '#2d2520' }}>Emma &amp; Oliver</div>
                <div className="s-date" style={{ color: '#8b7355' }}>MARCH 8, 2026</div>
              </div>
              <div className="showcase-name">Ivory Classic</div>
            </Link>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <div className="section-eyebrow" style={{ textAlign: 'center' }}>Simple process</div>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Ready in 3 steps</h2>
        <div className="steps">
          <div className="step"><div className="step-num">1</div><div className="step-title">Build your invitation</div><div className="step-desc">Fill in your details, pick a template, add your timeline and personalise every section.</div></div>
          <div className="step"><div className="step-num">2</div><div className="step-title">Publish and share</div><div className="step-desc">Get a beautiful link to share via WhatsApp, email or anywhere you like.</div></div>
          <div className="step"><div className="step-num">3</div><div className="step-title">Track RSVPs</div><div className="step-desc">Watch responses come in live. Know exactly who is attending your special day.</div></div>
        </div>
      </div>

      <div id="pricing" className="section">
        <div className="section-eyebrow">Simple pricing</div>
        <h2 className="section-title">One payment, forever yours</h2>
        <p className="section-sub">No subscriptions, no hidden fees. Pay once and your invitation lives forever.</p>
        <div className="pricing-grid">
          <div className="price-card">
            <div className="price-plan">Starter</div>
            <div className="price-amount"><sup>€</sup>0</div>
            <div style={{ height: '28px' }}></div>
            <ul className="price-features">
              <li><span className="check">✓</span> 1 invitation draft</li>
              <li><span className="check">✓</span> All 4 templates</li>
              <li><span className="check">✓</span> Watermarked preview</li>
              <li><span className="cross">✗</span> RSVP tracking</li>
              <li><span className="cross">✗</span> Shareable link</li>
              <li><span className="cross">✗</span> Guest dashboard</li>
            </ul>
            <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/builder')}>Start free</button>
          </div>
          <div className="price-card popular">
            <div className="popular-badge">Most popular</div>
            <div className="price-plan">Essential</div>
            <div className="price-amount"><sup>€</sup>149</div>
            <div className="price-old">Was €299</div>
            <div className="price-save">Launch offer — save €150</div>
            <ul className="price-features">
              <li><span className="check">✓</span> Everything in Starter</li>
              <li><span className="check">✓</span> Clean shareable link</li>
              <li><span className="check">✓</span> RSVP tracking and management</li>
              <li><span className="check">✓</span> Guest list dashboard</li>
              <li><span className="check">✓</span> WhatsApp and SMS share</li>
              <li><span className="check">✓</span> Multi-language support</li>
              <li><span className="check">✓</span> Day-of timeline</li>
              <li><span className="check">✓</span> Lifetime access</li>
            </ul>
            <button className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/builder')}>Get started — €149</button>
          </div>
          <div className="price-card">
            <div className="price-plan">Premium</div>
            <div className="price-amount"><sup>€</sup>349</div>
            <div style={{ height: '28px' }}></div>
            <ul className="price-features">
              <li><span className="check">✓</span> Everything in Essential</li>
              <li><span className="check">✓</span> Full theme color editor</li>
              <li><span className="check">✓</span> Cover video upload</li>
              <li><span className="check">✓</span> Custom domain</li>
              <li><span className="check">✓</span> Background music</li>
              <li><span className="check">✓</span> White label</li>
              <li><span className="check">✓</span> Priority support</li>
            </ul>
            <button className="btn btn-dark" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/builder')}>Get Premium</button>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Start your <em>forever</em> today</h2>
        <p>Join thousands of couples who chose EternalVows for their big day.</p>
        <button className="btn btn-gold" style={{ fontSize: '15px', padding: '16px 40px' }} onClick={() => navigate('/builder')}>Create your invitation — free</button>
      </div>

      <footer>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: 'rgba(255,255,255,.6)' }}>Eternal<span style={{ color: 'var(--gold)' }}>Vows</span></div>
        <div>© 2025 EternalVows. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span style={{ cursor: 'pointer' }}>Privacy</span>
          <span style={{ cursor: 'pointer' }}>Terms</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
        </div>
      </footer>
    </div>
  );
}
