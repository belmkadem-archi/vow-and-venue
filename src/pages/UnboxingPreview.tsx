import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvitation } from '../InvitationContext';
import { 
  ArrowLeft, 
  Share2, 
  CheckCircle, 
  Mail,
  Users,
  X,
  Volume2,
  VolumeX
} from 'lucide-react';

export default function UnboxingPreview() {
  const navigate = useNavigate();
  const { data } = useInvitation();
  const [isDetailsRevealed, setIsDetailsRevealed] = useState(false);
  const [isUnboxed, setIsUnboxed] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isPaperPulled, setIsPaperPulled] = useState(false);
  const [guests, setGuests] = useState("1");
  const [showRSVP, setShowRSVP] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRSVPSubmitted, setIsRSVPSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  const guestOptions = [
    { value: "1", label: "Alone", detail: "Attending Alone" },
    { value: "2", label: "2", detail: "With One Guest (+1)" },
    { value: "3", label: "3", detail: "Two Guests (+2)" },
    { value: "4", label: "4", detail: "Three Guests (+3)" }
  ];

  const handleUnbox = () => {
    // Vibrate/Haptic feel (if supported)
    if (window.navigator.vibrate) window.navigator.vibrate(50);
    
    setTimeout(() => {
      setIsFlapOpen(true);
      setTimeout(() => {
        setIsPaperPulled(true);
        setTimeout(() => {
          setIsUnboxed(true);
          // Wait a tiny bit and then reveal details automatically for the smooth botanical scroll
          setTimeout(() => setIsDetailsRevealed(true), 1500);
        }, 1500);
      }, 1200);
    }, 600); // Simulate firm tactile press
  };


  const handleRSVP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRsvpError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      guests: Number(guests),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setIsRSVPSubmitted(true);
        setShowRSVP(false);
        setTimeout(() => setIsRSVPSubmitted(false), 5000);
      } else {
        setRsvpError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setRsvpError('Failed to connect to the server. Check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `You're Invited: ${data.eventTitle}`,
          text: `${data.hostNames} is inviting you to a digital masterpiece.`,
          url: window.location.href,
        });
      } catch (error) {
        setShowShare(true);
      }
    } else {
      setShowShare(true);
    }
  };

  return (
    <div className="botanical-container">
      {/* Top Header Actions (Mute/Share) */}
      <div className="preview-controls container" style={{ 
        position: 'absolute', 
        top: '2rem', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        zIndex: 100, 
        width: 'calc(100% - 3rem)',
        maxWidth: '520px'
      }}>
        <button onClick={() => navigate('/builder')} className="btn-secondary glass" style={{ padding: '0.8rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none' }}>
          <ArrowLeft size={20} color="#f4eedd" />
        </button>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setIsMuted(!isMuted)} className="btn-secondary glass" style={{ padding: '0.8rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none' }}>
            {isMuted ? <VolumeX size={20} color="#f4eedd" /> : <Volume2 size={20} color="#f4eedd" />}
          </button>
          <button onClick={handleShare} className="btn-secondary glass" style={{ padding: '0.8rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none' }}>
            <Share2 size={20} color="#f4eedd" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isUnboxed ? (
          /* CINEMATIC UNBOXING STAGE (SAGE GREEN ENVELOPE) */
          <motion.div 
            key="unboxing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="unboxing-stage"
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '100vh',
              position: 'relative',
              background: '#f8f8f8' // Soft bright background behind the green envelope matching references
            }}
          >
            <div className="envelope-3d" onClick={!isFlapOpen ? handleUnbox : undefined}>
              <motion.div 
                className="envelope-container"
                initial={{ rotateX: 45, y: 100 }}
                animate={{ rotateX: isFlapOpen ? 0 : 15, y: isFlapOpen ? 50 : 0 }}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                style={{ 
                  width: '380px', 
                  height: '260px', 
                  background: 'linear-gradient(135deg, #42584A 0%, #2A382E 100%)', // Rich Sage/Emerald base
                  borderRadius: '6px',
                  boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  cursor: !isFlapOpen ? 'pointer' : 'default',
                  margin: '0 auto'
                }}
              >
                {/* Envelope Flap */}
                <div 
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '55%',
                    background: 'linear-gradient(135deg, #4A6353 0%, #304134 100%)', // Slightly lighter for top lighting
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    transformOrigin: 'top', zIndex: 5,
                    borderTop: '1px solid rgba(255,255,255,0.15)',
                    transform: isFlapOpen ? 'rotateX(160deg)' : 'rotateX(0deg)',
                    transition: 'transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                ></div>
                
                {/* Premium Inside Paper */}
                <div 
                  style={{
                    position: 'absolute', bottom: '10px', left: '5%', width: '90%', height: '90%',
                    background: '#f4eedd', zIndex: 2, borderRadius: '4px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    transform: isPaperPulled ? 'translateY(-80%) scale(1.05)' : 'translateY(0) scale(1)',
                    transition: 'transform 1.5s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                >
                   <h3 className="serif" style={{ color: '#2A382E', fontSize: '1.2rem', marginBottom: '1rem' }}>You're Invited</h3>
                   <div style={{ width: '30px', height: '1px', background: '#D4AF37', opacity: 0.5 }}></div>
                </div>

                {/* Envelope Front Body Shadow (The folded overlap) */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 4, borderRadius: '6px', background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.15) 100%)', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.div 
                          style={{ margin: '0 auto', width: '90px', height: '90px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.6))' }}
                          whileHover={{ scale: 1.05, rotate: 2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1}}>
                            <defs>
                              <radialGradient id="gold-grad" cx="30%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#FFF7D6" />
                                <stop offset="20%" stopColor="#D4AF37" />
                                <stop offset="50%" stopColor="#C59F2A" />
                                <stop offset="85%" stopColor="#8A6B1C" />
                                <stop offset="100%" stopColor="#4A380A" />
                              </radialGradient>
                              <filter id="gold-inner-shadow">
                                <feOffset dx="0" dy="2"/>
                                <feGaussianBlur stdDeviation="1.5" result="offset-blur"/>
                                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
                                <feFlood floodColor="#4A380A" floodOpacity="0.9" result="color"/>
                                <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
                                <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
                              </filter>
                              <filter id="gold-drop-shadow">
                                <feDropShadow dx="0" dy="5" stdDeviation="5" floodOpacity="0.5" />
                              </filter>
                            </defs>
                            <path d="M50 2C65 1 78 8 85 18C92 28 98 42 96 55C94 68 85 80 72 88C60 95 45 98 32 94C20 89 10 78 5 65C0 52 2 35 10 22C18 10 32 3 50 2Z" fill="url(#gold-grad)" filter="url(#gold-drop-shadow)" />
                            <circle cx="50" cy="50" r="34" fill="url(#gold-grad)" filter="url(#gold-inner-shadow)" />
                            <circle cx="50" cy="50" r="31" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
                          </svg>
                          <span style={{ position: 'relative', zIndex: 2, fontFamily: 'var(--font-serif)', color: '#4A380A', fontSize: '1.5rem', fontStyle: 'italic', fontWeight: 700, textShadow: '-1px -1px 0 rgba(255,255,255,0.4), 1px 1px 2px rgba(0,0,0,0.3)' }}>
                            S<span style={{fontSize: '0.8rem', margin: '0 2px'}}>&</span>J
                          </span>
                        </motion.div>
                        <p style={{ marginTop: '2rem', letterSpacing: '0.4em', fontSize: '0.65rem', color: '#8A6B1C', fontWeight: 800, textTransform: 'uppercase', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Click to open...</p>
                      </motion.div>
                   </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* DETAILS REVEALED STAGE (Ethereal Botanical Hero) */
          <motion.div key="invite" initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 1.5}}>
      {/* Hero Section */}
      <motion.div 
        animate={{ y: isDetailsRevealed ? -100 : 0 }} 
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        className="botanical-hero-img-container"
      >
        <img 
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2669&auto=format&fit=crop" 
          alt="Couple" 
          className="botanical-hero-img" 
        />
        
        {/* The Cream Overlapping Badge */}
        <div className="botanical-badge-wrapper">
          <div className="botanical-badge">
            <h2 className="botanical-title">You're Invited!</h2>
            <p className="botanical-subtitle">Join us in making this day<br/>unforgettable!</p>
            <button 
              className="btn-olive" 
              onClick={() => {
                if (window.navigator.vibrate) window.navigator.vibrate(50);
                setIsDetailsRevealed(true);
                // Scroll to timeline smoothly
                setTimeout(() => {
                  document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              Discover the details
            </button>
          </div>
          {/* Floral Left */}
          <div className="botanical-floral botanical-floral-left">
            <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 150 C 20 100, 10 50, 40 10" stroke="#f4eedd" strokeWidth="2" fill="none" />
              <path d="M45 130 C 25 120, 15 110, 20 100 C 35 105, 45 115, 45 130 Z" fill="#f4eedd" opacity="0.9" />
              <path d="M35 90 C 15 80, 5 70, 10 60 C 25 65, 35 75, 35 90 Z" fill="#f4eedd" opacity="0.8" />
              <path d="M42 50 C 22 40, 12 30, 17 20 C 32 25, 42 35, 42 50 Z" fill="#f4eedd" opacity="0.9" />
              <circle cx="20" cy="110" r="4" fill="#fff" />
              <circle cx="15" cy="70" r="3" fill="#fff" />
              <circle cx="25" cy="30" r="4.5" fill="#fff" />
            </svg>
          </div>
          {/* Floral Right */}
          <div className="botanical-floral botanical-floral-right">
             <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 150 C 20 100, 10 50, 40 10" stroke="#f4eedd" strokeWidth="2" fill="none" />
              <path d="M45 130 C 25 120, 15 110, 20 100 C 35 105, 45 115, 45 130 Z" fill="#f4eedd" opacity="0.9" />
              <path d="M35 90 C 15 80, 5 70, 10 60 C 25 65, 35 75, 35 90 Z" fill="#f4eedd" opacity="0.8" />
              <path d="M42 50 C 22 40, 12 30, 17 20 C 32 25, 42 35, 42 50 Z" fill="#f4eedd" opacity="0.9" />
              <circle cx="20" cy="110" r="4" fill="#fff" />
              <circle cx="15" cy="70" r="3" fill="#fff" />
              <circle cx="25" cy="30" r="4.5" fill="#fff" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Details / Timeline Stage */}
      <AnimatePresence>
        {isDetailsRevealed && (
          <motion.div 
            id="timeline"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="timeline-section"
          >
            <h3 className="timeline-header">Event timeline</h3>
            
            <div className="timeline-box">
               <div className="timeline-date-badge">{data.date || "24 March"}</div>
               
               <div className="timeline-item">
                 <div className="timeline-time-event">
                   <span className="timeline-time">12:00</span>
                   <span className="timeline-dash">-</span>
                   <span className="timeline-event">Wedding ceremony</span>
                 </div>
                 <div className="timeline-location">
                   {data.venue || "Vrtba Garden, Karmelitska 25, 118 00 Praha 1"}
                 </div>
               </div>

               <div className="timeline-item">
                 <div className="timeline-time-event">
                   <span className="timeline-time">13:30</span>
                   <span className="timeline-dash">-</span>
                   <span className="timeline-event">Transfer</span>
                 </div>
               </div>

               <div className="timeline-item">
                 <div className="timeline-time-event">
                   <span className="timeline-time">14:00</span>
                   <span className="timeline-dash">-</span>
                   <span className="timeline-event">Cocktail hour</span>
                 </div>
                 <div className="timeline-location">
                   Petřínské sady 411/14, 118 00 Praha 1
                 </div>
               </div>

               <div className="timeline-item">
                 <div className="timeline-time-event">
                   <span className="timeline-time">15:00</span>
                   <span className="timeline-dash">-</span>
                   <span className="timeline-event">First dance</span>
                 </div>
               </div>

               <div className="timeline-item">
                 <div className="timeline-time-event">
                   <span className="timeline-time">17:00</span>
                   <span className="timeline-dash">-</span>
                   <span className="timeline-event">Dinner & Party</span>
                 </div>
               </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
               <button 
                  className="btn-olive" 
                  style={{ width: '100%', maxWidth: '300px', padding: '1.2rem', fontSize: '1rem', borderRadius: '30px' }}
                  onClick={() => setShowRSVP(true)}
                 >
                   RSVP Now
                </button>
            </div>
            
            {/* Success Toast Details Form */}
            <AnimatePresence>
              {isRSVPSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{ marginTop: '2rem', padding: '1rem', color: '#b39b5d', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', background: 'rgba(178, 156, 103, 0.1)', borderRadius: '12px' }}
                >
                  <CheckCircle size={18} />
                  Your response has been secured.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RSVP Modal */}
      <AnimatePresence>
        {showRSVP && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(15px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass"
              style={{ width: '100%', maxWidth: '500px', padding: '4rem', borderRadius: '24px', position: 'relative', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <button 
                className="btn-secondary" 
                style={{ position: 'absolute', top: '2rem', right: '2rem', border: 'none', background: 'transparent' }}
                onClick={() => setShowRSVP(false)}
              >
                <X size={24} />
              </button>
              
              <h3 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 400 }}>R.S.V.P.</h3>
              <p style={{ color: 'var(--text-dim)', marginBottom: '4rem', fontSize: '0.9rem', letterSpacing: '0.05em' }}>Will you join us for this unique evening?</p>

              <form onSubmit={handleRSVP} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div className="input-group">
                  <label><Users size={14} /> Full Name</label>
                  <input name="name" type="text" required placeholder="Guest Name" disabled={isSubmitting} />
                </div>
                
                <div className="input-group">
                  <label><Mail size={14} /> Email Address</label>
                  <input name="email" type="email" required placeholder="hello@guest.com" disabled={isSubmitting} />
                </div>

                 <div className="input-group" style={{ marginBottom: '2.5rem' }}>
                   <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <span><Users size={14} /> ADDITIONAL GUESTS</span>
                     <span style={{ fontSize: '0.65rem', color: 'var(--primary)', opacity: 0.8 }}>
                       {guestOptions.find(o => o.value === guests)?.detail}
                     </span>
                   </label>
                   
                   <div style={{ 
                     display: 'grid', 
                     gridTemplateColumns: 'repeat(4, 1fr)', 
                     gap: '0.8rem',
                     marginTop: '1rem' 
                   }}>
                     {guestOptions.map((opt) => (
                       <button
                         key={opt.value}
                         type="button"
                         onClick={() => setGuests(opt.value)}
                         className={`glass ${guests === opt.value ? 'cinematic-glow' : ''}`}
                         style={{
                           padding: '1rem',
                           borderRadius: '12px',
                           fontSize: '0.9rem',
                           fontWeight: 700,
                           fontFamily: 'var(--font-main)',
                           background: guests === opt.value ? 'var(--primary)' : 'rgba(255,255,255,0.02)',
                           color: guests === opt.value ? '#fff' : 'var(--text-dim)',
                           border: guests === opt.value ? '1px solid var(--accent)' : '1px solid var(--border)',
                           transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                           cursor: 'pointer'
                         }}
                       >
                         {opt.label}
                       </button>
                     ))}
                   </div>
                 </div>

                {rsvpError && (
                  <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center' }}>{rsvpError}</p>
                )}

                <button 
                  className="btn-primary cinematic-glow" 
                  style={{ width: '100%', padding: '1.2rem', marginTop: '1rem' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'SECURELY SENDING...' : 'CONFIRM ATTENDANCE'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal (Fallback) */}
      <AnimatePresence>
        {showShare && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <motion.div className="glass" style={{ width: '90%', maxWidth: '400px', padding: '2.5rem', borderRadius: '30px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="share-icon" style={{ marginBottom: '2rem', color: 'var(--primary)' }}><Share2 size={48} /></div>
              <h3 className="serif" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Share Masterpiece</h3>
              <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem' }}>Copy this unique link to send to your guests.</p>
              
              <div className="glass" style={{ padding: '1.2rem', marginBottom: '2.5rem', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--primary)', wordBreak: 'break-all', borderRadius: '12px' }}>
                {window.location.href}
              </div>

              <button 
                className="btn-primary" 
                style={{ width: '100%' }}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setShowShare(false);
                }}
              >
                Copy to Clipboard
              </button>
              <button 
                className="btn-secondary" 
                style={{ width: '100%', border: 'none', marginTop: '1rem' }}
                onClick={() => setShowShare(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
