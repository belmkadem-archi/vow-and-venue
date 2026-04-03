import { useState } from 'react';
import { supabase } from '../lib/supabase';

// This component is a 1:1, pixel-perfect faithful translation of the user's EternalVows_MVP.html.
// We preserve the exact DOM structure, CSS classes, and inline styles to guarantee the design is 100% matched.

const INITIAL_TL = [
  { time: '7:00 PM', title: 'Ceremony', desc: 'Opening ceremony' },
  { time: '8:30 PM', title: 'Cocktail Hour', desc: 'Drinks and canapés' },
  { time: '9:30 PM', title: 'Dinner', desc: 'Grand banquet' },
  { time: '11:00 PM', title: 'After Party', desc: 'Dance until midnight' }
];

const INITIAL_FAQ = [
  { q: 'What should I wear?', a: 'Smart elegant attire. Think sophisticated evening wear.' },
  { q: 'Is there parking?', a: 'Yes, free parking is available at the venue.' }
];

export default function MainApp() {
  const [view, setView] = useState<'landing' | 'builder' | 'guest'>('landing');
  const [tab, setTab] = useState<'details' | 'design' | 'extras'>('details');
  const [toastMsg, setToastMsg] = useState('');
  
  // Form Data State
  const [tpl, setTpl] = useState('garden');
  const [p1, setP1] = useState('Brahim');
  const [p2, setP2] = useState('Laila');
  const [wdate, setWdate] = useState('2025-09-29');
  const [wtime, setWtime] = useState('19:00');
  const [venue, setVenue] = useState('Château des Roses');
  const [address, setAddress] = useState('12 Rue du Jardin, Casablanca');
  const [showDress, setShowDress] = useState(false);
  const [dresscode, setDresscode] = useState('Smart elegant');
  const [showGift, setShowGift] = useState(true);
  const [giftmsg, setGiftmsg] = useState('Your presence is the greatest gift. For those who wish to contribute, a donation to our honeymoon adventure would be wonderful.');
  const [bankname, setBankname] = useState('');
  const [accholder, setAccholder] = useState('Brahim & Laila');
  const [iban, setIban] = useState('');
  const [guestmsg, setGuestmsg] = useState('We cannot wait to celebrate this special day with you. Your presence means the world to us.');
  const [rsvpdate, setRsvpdate] = useState('2025-09-01');
  
  const [tlItems, setTlItems] = useState(INITIAL_TL);
  const [faqItems, setFaqItems] = useState(INITIAL_FAQ);

  const [isPublishing, setIsPublishing] = useState(false);
  const [guestRsvpSubmitted, setGuestRsvpSubmitted] = useState(false);
  const [selectedRsvp, setSelectedRsvp] = useState<'yes'|'no'|null>(null);

  // Computed Date Strings
  const dt = new Date(`${wdate}T${wtime}`);
  const ds = isNaN(dt.getTime()) ? 'September 29, 2025' : dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
  const ts = isNaN(dt.getTime()) ? '7:00 PM' : dt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const rdo = new Date(rsvpdate);
  const rdf = rsvpdate && !isNaN(rdo.getTime()) ? rdo.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  const toast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const publish = async () => {
    setIsPublishing(true);
    toast('Publishing your masterpiece...');
    try {
      const { data: invite, error } = await supabase.from('invitations').insert([{
        hostNames: `${p1} & ${p2}`,
        eventTitle: 'Our Wedding',
        date: wdate,
        time: wtime,
        venue: venue,
        mapsLink: address,
        soundtrack: '',
        personalMessage: guestmsg,
        template: tpl,
        timeline_items: tlItems.map(t => ({ time: t.time, title: t.title, description: t.desc })),
        faq_items: faqItems.map(f => ({ question: f.q, answer: f.a })),
        gift_info: showGift ? { message: giftmsg, bankName: bankname, accountHolder: accholder, iban } : {},
        dress_code: showDress ? dresscode : '',
        rsvp_deadline: rsvpdate,
        hostEmail: '',
        is_premium: false
      }]).select().single();

      if (error) throw error;
      
      toast(`Live: eternalvows.com/v/${invite.id}`);
      setTimeout(() => setView('guest'), 1600);
    } catch (err) {
      console.error(err);
      toast('Failed to publish. Check connection.');
    } finally {
      setIsPublishing(false);
    }
  };

  // Reusable component representing the Invitation card exactly as the HTML 'buildInv' rendered it
  const InvitationCard = ({ mode }: { mode: 'prev' | 'guest' }) => (
    <div className={`t-${tpl}`}>
      <div className="inv-cover">
        <div className="inv-cover-bg"></div>
        <div className="inv-cover-content">
          <div className="inv-eyebrow">You are invited to celebrate</div>
          <div className="inv-names">{p1}</div>
          <div className="inv-and">&amp;</div>
          <div className="inv-names">{p2}</div>
          <div className="inv-divider"></div>
          <div className="inv-date-line">{ds} · {ts}</div>
        </div>
      </div>
      
      <div className="inv-body">
        <div className="inv-section">
          <div className="inv-section-title">Venue</div>
          <div className="inv-venue">{venue}</div>
          <div className="inv-address">{address}</div>
          <button className="inv-map-btn" onClick={() => toast('Opening Google Maps…')}>📍 View on map</button>
        </div>
        
        {guestmsg && (
          <div className="inv-section">
            <div className="inv-section-title">A message for you</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontStyle: 'italic', lineHeight: 1.6, opacity: 0.8, fontWeight: 300 }}>
              "{guestmsg}"
            </p>
          </div>
        )}
        
        {tlItems.length > 0 && (
          <div className="inv-section">
            <div className="inv-section-title">Day timeline</div>
            {tlItems.map((it, i) => (
              <div className="inv-tl-item" key={i}>
                <div className="inv-tl-dot"></div>
                <div>
                  <div className="inv-tl-time">{it.time}</div>
                  <div className="inv-tl-title">{it.title}</div>
                  <div className="inv-tl-desc">{it.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {faqItems.length > 0 && (
          <div className="inv-section">
            <div className="inv-section-title">FAQs</div>
            {faqItems.map((f, i) => (
              <div className="inv-faq" key={i}>
                <div className="inv-faq-q">{f.q}</div>
                <div className="inv-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        )}
        
        {showDress && dresscode && (
          <div className="inv-section">
            <div className="inv-section-title">Dress code</div>
            <p style={{ fontSize: '14px', fontWeight: 500 }}>{dresscode}</p>
          </div>
        )}
        
        {showGift && (
          <div className="inv-section">
            <div className="inv-section-title">Gift</div>
            <p style={{ fontSize: '13px', opacity: 0.7, lineHeight: 1.7, marginBottom: iban ? '12px' : '0', fontWeight: 300 }}>
              {giftmsg}
            </p>
            {iban && (
              <div style={{ background: 'var(--warm)', borderRadius: '8px', padding: '12px', fontSize: '12px' }}>
                <div style={{ opacity: 0.6, marginBottom: '4px' }}>{bankname || 'Bank'} · {accholder}</div>
                <div style={{ fontWeight: 500, letterSpacing: '.05em' }}>{iban}</div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="inv-rsvp-section">
        {!guestRsvpSubmitted || mode === 'prev' ? (
          <div id={`${mode}-rsvp-form`}>
            <div className="inv-rsvp-title">Will you join us?</div>
            <div className="inv-rsvp-sub">Please RSVP{rdf ? ` by ${rdf}` : ' at your earliest convenience'}</div>
            <input className="inv-input" id={`${mode}-name`} placeholder="Your full name" style={{ border: '1px solid var(--border)', background: 'var(--cream)' }} disabled={mode==='prev'} />
            <input className="inv-input" id={`${mode}-email`} placeholder="Your email" style={{ border: '1px solid var(--border)', background: 'var(--cream)' }} disabled={mode==='prev'} />
            <div className="rsvp-btns">
              <button 
                className="rsvp-choice yes" 
                style={{ opacity: selectedRsvp === 'yes' || !selectedRsvp ? 1 : 0.4, fontWeight: selectedRsvp === 'yes' ? 700 : 500 }}
                onClick={() => setSelectedRsvp('yes')}
                disabled={mode==='prev'}
              >✓ Joyfully attending</button>
              <button 
                className="rsvp-choice no" 
                style={{ opacity: selectedRsvp === 'no' || !selectedRsvp ? 1 : 0.4, fontWeight: selectedRsvp === 'no' ? 700 : 500 }}
                onClick={() => setSelectedRsvp('no')}
                disabled={mode==='prev'}
              >✕ Regretfully decline</button>
            </div>
            <textarea className="inv-input" rows={2} style={{ resize: 'none', border: '1px solid var(--border)', background: 'var(--cream)' }} placeholder="Leave a message (optional)" disabled={mode==='prev'}></textarea>
            <button className="inv-submit" onClick={() => {
              if (mode === 'prev') return;
              const nm = (document.getElementById(`${mode}-name`) as HTMLInputElement)?.value;
              if (!nm) return toast('Please enter your name');
              if (!selectedRsvp) return toast('Please select your attendance');
              setGuestRsvpSubmitted(true);
              toast('RSVP received! 🎉');
            }} disabled={mode==='prev'}>Send my RSVP</button>
          </div>
        ) : (
          <div className="rsvp-success" style={{ display: 'block' }}>
            <div className="si">💌</div>
            <h3>Thank you!</h3>
            <p>Your RSVP has been received. We cannot wait to celebrate with you.</p>
          </div>
        )}
      </div>
      <div className="inv-footer">ETERNALVOWS.COM</div>
    </div>
  );

  return (
    <>
      <nav style={{ display: view === 'guest' ? 'none' : 'flex' }}>
        <div className="nav-logo" onClick={() => setView('landing')}>Eternal<span>Vows</span></div>
        <div className="nav-links">
          <a onClick={() => { setView('landing'); setTimeout(() => document.getElementById('features')?.scrollIntoView({behavior:'smooth'}), 60); }}>Features</a>
          <a onClick={() => { setView('landing'); setTimeout(() => document.getElementById('templates')?.scrollIntoView({behavior:'smooth'}), 60); }}>Templates</a>
          <a onClick={() => { setView('landing'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'}), 60); }}>Pricing</a>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline btn-sm" onClick={() => setView('builder')}>Sign in</button>
          <button className="btn btn-dark btn-sm" onClick={() => setView('builder')}>Start free</button>
        </div>
      </nav>

      {/* LANDING */}
      <div id="view-landing" className={`view ${view === 'landing' ? 'active' : ''}`}>
        <div className="hero">
          <div className="hero-bg"></div>
          <div className="hero-deco tl">❧</div>
          <div className="hero-deco br">❧</div>
          <div className="hero-content">
            <div className="hero-eyebrow">Digital Wedding Invitations</div>
            <h1 className="hero-title">Your love story<br />deserves a <em>beautiful</em><br />beginning</h1>
            <p className="hero-sub">Create stunning digital wedding invitations in minutes. Share with all your guests in one link. Collect RSVPs effortlessly.</p>
            <div className="hero-actions">
              <button className="btn btn-dark" onClick={() => setView('builder')} style={{ fontSize: '14px', padding: '14px 32px' }}>Create your invitation</button>
              <button className="btn btn-outline" onClick={() => setView('guest')} style={{ fontSize: '14px', padding: '14px 32px' }}>See a live demo</button>
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
              <div className="showcase-card" onClick={() => setView('builder')}>
                <div className="showcase-thumb" style={{ background: 'linear-gradient(160deg,#e8f0e4,#f5f0e8)' }}>
                  <div className="s-names" style={{ color: '#2a3d28' }}>Sarah &amp; James</div>
                  <div className="s-date" style={{ color: '#4a6741' }}>JUNE 14, 2025</div>
                </div>
                <div className="showcase-name">Garden of Eden</div>
              </div>
              <div className="showcase-card" onClick={() => setView('builder')}>
                <div className="showcase-thumb" style={{ background: 'linear-gradient(160deg,#1c1a18,#2d2720)' }}>
                  <div className="s-names" style={{ color: '#faf7f2' }}>Isabella &amp; Sebastian</div>
                  <div className="s-date" style={{ color: '#c9a96e' }}>OCTOBER 5, 2025</div>
                </div>
                <div className="showcase-name">Golden Night</div>
              </div>
              <div className="showcase-card" onClick={() => setView('builder')}>
                <div className="showcase-thumb" style={{ background: 'linear-gradient(160deg,#f9eff5,#ede0ec)' }}>
                  <div className="s-names" style={{ color: '#4a1e35' }}>Layla &amp; Karim</div>
                  <div className="s-date" style={{ color: '#9b5a7a' }}>SEPTEMBER 20, 2025</div>
                </div>
                <div className="showcase-name">Rose Bloom</div>
              </div>
              <div className="showcase-card" onClick={() => setView('builder')}>
                <div className="showcase-thumb" style={{ background: 'linear-gradient(160deg,#faf6f0,#f5ede0)' }}>
                  <div className="s-names" style={{ color: '#2d2520' }}>Emma &amp; Oliver</div>
                  <div className="s-date" style={{ color: '#8b7355' }}>MARCH 8, 2026</div>
                </div>
                <div className="showcase-name">Ivory Classic</div>
              </div>
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
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setView('builder')}>Start free</button>
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
              <button className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setView('builder')}>Get started — €149</button>
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
              <button className="btn btn-dark" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setView('builder')}>Get Premium</button>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Start your <em>forever</em> today</h2>
          <p>Join thousands of couples who chose EternalVows for their big day.</p>
          <button className="btn btn-gold" style={{ fontSize: '15px', padding: '16px 40px' }} onClick={() => setView('builder')}>Create your invitation — free</button>
        </div>

        <footer>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', color: 'rgba(255,255,255,.6)' }}>Eternal<span style={{ color: 'var(--gold)' }}>Vows</span></div>
          <div>© 2025 EternalVows. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '24px' }}><span style={{ cursor: 'pointer' }}>Privacy</span><span style={{ cursor: 'pointer' }}>Terms</span><span style={{ cursor: 'pointer' }}>Contact</span></div>
        </footer>
      </div>

      {/* BUILDER */}
      <div id="view-builder" className={`view ${view === 'builder' ? 'active' : ''}`}>
        <div className="builder-wrap">
          <div className="builder-sidebar">
            <div className="builder-header">
              <h2>Your Invitation</h2>
              <button className="btn btn-sm btn-outline" onClick={() => setView('landing')}>← Back</button>
            </div>
            <div className="builder-tabs">
              <div className={`builder-tab ${tab === 'details' ? 'active' : ''}`} onClick={() => setTab('details')}>Details</div>
              <div className={`builder-tab ${tab === 'design' ? 'active' : ''}`} onClick={() => setTab('design')}>Design</div>
              <div className={`builder-tab ${tab === 'extras' ? 'active' : ''}`} onClick={() => setTab('extras')}>Extras</div>
            </div>

            <div id="panel-details" className={`builder-panel ${tab === 'details' ? 'active' : ''}`}>
              <div className="section-label">Couple</div>
              <div className="field-row">
                <div className="field-group"><label className="field-label">Partner 1</label><input className="field-input" value={p1} onChange={(e) => setP1(e.target.value)} /></div>
                <div className="field-group"><label className="field-label">Partner 2</label><input className="field-input" value={p2} onChange={(e) => setP2(e.target.value)} /></div>
              </div>
              <div className="section-label">Date and Time</div>
              <div className="field-row">
                <div className="field-group"><label className="field-label">Date</label><input className="field-input" type="date" value={wdate} onChange={(e) => setWdate(e.target.value)} /></div>
                <div className="field-group"><label className="field-label">Time</label><input className="field-input" type="time" value={wtime} onChange={(e) => setWtime(e.target.value)} /></div>
              </div>
              <div className="section-label">Venue</div>
              <div className="field-group"><label className="field-label">Venue name</label><input className="field-input" value={venue} onChange={(e) => setVenue(e.target.value)} /></div>
              <div className="field-group"><label className="field-label">Address</label><input className="field-input" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
              
              <div className="section-label">Day timeline</div>
              <div>
                {tlItems.map((item, i) => (
                  <div className="timeline-item" key={i}>
                    <div className="timeline-item-header">
                      <span className="timeline-item-title">Item {i + 1}</span>
                      <button className="remove-btn" onClick={() => setTlItems(tlItems.filter((_, idx) => idx !== i))}>✕</button>
                    </div>
                    <div className="field-row">
                      <div className="field-group" style={{ marginBottom: '8px' }}><label className="field-label">Time</label><input className="field-input" value={item.time} onChange={(e) => { const n = [...tlItems]; n[i].time = e.target.value; setTlItems(n); }} /></div>
                      <div className="field-group" style={{ marginBottom: '8px' }}><label className="field-label">Title</label><input className="field-input" value={item.title} onChange={(e) => { const n = [...tlItems]; n[i].title = e.target.value; setTlItems(n); }} /></div>
                    </div>
                    <div className="field-group" style={{ marginBottom: 0 }}><label className="field-label">Description</label><input className="field-input" value={item.desc} onChange={(e) => { const n = [...tlItems]; n[i].desc = e.target.value; setTlItems(n); }} /></div>
                  </div>
                ))}
              </div>
              <button className="add-btn" onClick={() => setTlItems([...tlItems, { time: '12:00 PM', title: 'New event', desc: 'Description' }])}>+ Add timeline item</button>
              
              <div className="section-label" style={{ marginTop: '24px' }}>FAQs</div>
              <div>
                {faqItems.map((item, i) => (
                  <div className="faq-item" key={i}>
                    <div className="timeline-item-header">
                      <span className="timeline-item-title">FAQ {i + 1}</span>
                      <button className="remove-btn" onClick={() => setFaqItems(faqItems.filter((_, idx) => idx !== i))}>✕</button>
                    </div>
                    <div className="field-group" style={{ marginBottom: '8px' }}><label className="field-label">Question</label><input className="field-input" value={item.q} onChange={(e) => { const n = [...faqItems]; n[i].q = e.target.value; setFaqItems(n); }} /></div>
                    <div className="field-group" style={{ marginBottom: 0 }}><label className="field-label">Answer</label><textarea className="field-input" rows={2} style={{ resize: 'vertical' }} value={item.a} onChange={(e) => { const n = [...faqItems]; n[i].a = e.target.value; setFaqItems(n); }} /></div>
                  </div>
                ))}
              </div>
              <button className="add-btn" onClick={() => setFaqItems([...faqItems, { q: 'New question?', a: 'Your answer here.' }])}>+ Add FAQ</button>
            </div>

            <div id="panel-design" className={`builder-panel ${tab === 'design' ? 'active' : ''}`}>
              <div className="section-label">Template</div>
              <div className="template-grid">
                <div className={`template-opt ${tpl === 'garden' ? 'selected' : ''}`} onClick={() => setTpl('garden')}><div className="template-thumb" style={{ background: 'linear-gradient(135deg,#e8f0e4,#f5f0e8)' }}>🌿</div><div className="template-name">Garden of Eden</div></div>
                <div className={`template-opt ${tpl === 'golden' ? 'selected' : ''}`} onClick={() => setTpl('golden')}><div className="template-thumb" style={{ background: 'linear-gradient(135deg,#1c1a18,#2a2520)', color: '#c9a96e', fontSize: '28px' }}>✦</div><div className="template-name">Golden Night</div></div>
                <div className={`template-opt ${tpl === 'rose' ? 'selected' : ''}`} onClick={() => setTpl('rose')}><div className="template-thumb" style={{ background: 'linear-gradient(135deg,#f9eff5,#ede0ec)' }}>🌸</div><div className="template-name">Rose Bloom</div></div>
                <div className={`template-opt ${tpl === 'ivory' ? 'selected' : ''}`} onClick={() => setTpl('ivory')}><div className="template-thumb" style={{ background: 'linear-gradient(135deg,#faf6f0,#f5ede0)' }}>🕊️</div><div className="template-name">Ivory Classic</div></div>
              </div>
              <div className="section-label">Options</div>
              <div className="toggle-row"><span className="toggle-label">Save the date button</span><label className="toggle"><input type="checkbox" defaultChecked /><span className="toggle-slider"></span></label></div>
              <div className="toggle-row"><span className="toggle-label">Show dress code</span><label className="toggle"><input type="checkbox" checked={showDress} onChange={(e) => setShowDress(e.target.checked)} /><span className="toggle-slider"></span></label></div>
              {showDress && <div className="field-group" style={{ marginTop: '12px' }}><label className="field-label">Dress code</label><input className="field-input" value={dresscode} onChange={(e) => setDresscode(e.target.value)} /></div>}
            </div>

            <div id="panel-extras" className={`builder-panel ${tab === 'extras' ? 'active' : ''}`}>
              <div className="section-label">Gift information</div>
              <div className="toggle-row"><span className="toggle-label">Show gift info</span><label className="toggle"><input type="checkbox" checked={showGift} onChange={(e) => setShowGift(e.target.checked)} /><span className="toggle-slider"></span></label></div>
              {showGift && (
                <div>
                  <div className="field-group" style={{ marginTop: '12px' }}><label className="field-label">Gift message</label><textarea className="field-input" rows={3} value={giftmsg} onChange={(e) => setGiftmsg(e.target.value)} style={{ resize: 'vertical' }} /></div>
                  <div className="field-row">
                    <div className="field-group"><label className="field-label">Bank</label><input className="field-input" placeholder="Bank name" value={bankname} onChange={(e) => setBankname(e.target.value)} /></div>
                    <div className="field-group"><label className="field-label">Account holder</label><input className="field-input" value={accholder} onChange={(e) => setAccholder(e.target.value)} /></div>
                  </div>
                  <div className="field-group"><label className="field-label">IBAN</label><input className="field-input" placeholder="XX00 0000 0000 0000" value={iban} onChange={(e) => setIban(e.target.value)} /></div>
                </div>
              )}
              <div className="section-label">Personal message</div>
              <div className="field-group"><label className="field-label">Message to guests</label><textarea className="field-input" rows={3} value={guestmsg} onChange={(e) => setGuestmsg(e.target.value)} style={{ resize: 'vertical' }} /></div>
              <div className="section-label">RSVP deadline</div>
              <div className="field-group"><label className="field-label">RSVP by</label><input className="field-input" type="date" value={rsvpdate} onChange={(e) => setRsvpdate(e.target.value)} /></div>
            </div>

            <div style={{ padding: '20px 28px', borderTop: '1px solid var(--border)', background: '#fff', position: 'sticky', bottom: 0 }}>
              <button className="btn btn-green" style={{ width: '100%', justifyContent: 'center', fontSize: '14px', padding: '13px' }} onClick={publish} disabled={isPublishing}>
                {isPublishing ? 'Publishing...' : 'Publish and share invitation'}
              </button>
              <div style={{ textAlign: 'center', marginTop: '10px' }}><a style={{ fontSize: '12px', color: 'var(--muted)', cursor: 'pointer' }} onClick={() => setView('guest')}>Preview as guest →</a></div>
            </div>
          </div>

          <div className="builder-preview">
            <div className="preview-bar">
              <span className="preview-bar-title">LIVE PREVIEW</span>
              <div className="preview-actions">
                <button className="btn btn-sm btn-outline" onClick={() => setView('guest')}>Open as guest</button>
                <button className="btn btn-sm btn-gold" onClick={publish} disabled={isPublishing}>Publish</button>
              </div>
            </div>
            <div className="preview-scroll">
              <div className="inv-frame">
                <InvitationCard mode="prev" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GUEST VIEW */}
      <div id="view-guest" className={`view ${view === 'guest' ? 'active' : ''}`}>
        <div style={{ minHeight: '100vh', background: 'var(--warm)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '460px', marginBottom: '32px' }}>
            <div className="nav-logo" onClick={() => setView('landing')} style={{ fontSize: '18px' }}>Eternal<span>Vows</span></div>
            <button className="btn btn-sm btn-outline" onClick={() => setView('builder')}>← Edit</button>
          </div>
          <div className="inv-frame" style={{ width: '100%', maxWidth: '460px' }}>
            <InvitationCard mode="guest" />
          </div>
          <p style={{ marginTop: '24px', fontSize: '11px', color: 'var(--muted)', letterSpacing: '.1em' }}>CREATED WITH ETERNALVOWS.COM</p>
        </div>
      </div>

      <div className={`toast ${toastMsg ? 'show' : ''}`} id="toast">{toastMsg}</div>
    </>
  );
}
